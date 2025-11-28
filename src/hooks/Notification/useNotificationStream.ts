import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '../../api/services/notificationService';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { getAccessToken } from '../../utils/api';
import type { NotificationStreamEvent } from '../../api/types/notification';

let globalEventSource: { close: () => void } | null = null;
let globalConnectTimeout: number | null = null;
let connectionCount = 0;
let lastToken: string | null = null;

interface UseNotificationStreamOptions {
  waitForHomeData?: boolean;
  homeDataLoaded?: boolean;
}

// 토큰 변경 감지를 위한 커스텀 훅
const useTokenChange = () => {
  const [token, setToken] = useState<string | null>(() => getAccessToken());

  useEffect(() => {
    const checkToken = () => {
      const currentToken = getAccessToken();
      if (currentToken !== token) {
        setToken(currentToken);
      }
    };

    // 주기적으로 토큰 체크 (토큰 갱신 감지)
    const interval = setInterval(checkToken, 1000);

    // localStorage 변경 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  return token;
};

export const useNotificationStream = (options?: UseNotificationStreamOptions) => {
  const { isLoggedIn } = useAuthStore();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);
  const queryClient = useQueryClient();
  const isMountedRef = useRef(true);
  const currentToken = useTokenChange();

  useEffect(() => {
    isMountedRef.current = true;
    const token = getAccessToken();
    const hasValidAuth = isLoggedIn && !!token;

    // 토큰이 변경되었고 기존 연결이 있으면 재연결
    const tokenChanged = token !== lastToken;
    if (tokenChanged && globalEventSource && hasValidAuth) {
      globalEventSource.close();
      globalEventSource = null;
      if (globalConnectTimeout) {
        clearTimeout(globalConnectTimeout);
        globalConnectTimeout = null;
      }
    }

    if (!hasValidAuth) {
      // 로그아웃 시 전역 연결 종료
      if (globalEventSource) {
        globalEventSource.close();
        globalEventSource = null;
      }
      if (globalConnectTimeout) {
        clearTimeout(globalConnectTimeout);
        globalConnectTimeout = null;
      }
      setUnreadCount(0);
      connectionCount = 0;
      lastToken = null;
      return;
    }

    connectionCount++;

    // 토큰이 변경되지 않았고 기존 연결이 있으면 유지
    if (!tokenChanged && globalEventSource) {
      lastToken = token;
      return;
    }

    // 토큰이 변경되었거나 연결이 없으면 새로 연결
    lastToken = token;

    if (options?.waitForHomeData && !options?.homeDataLoaded) {
      return;
    }

    const delay = options?.homeDataLoaded ? 1000 : 2000;

    globalConnectTimeout = setTimeout(() => {
      if (!isMountedRef.current || globalEventSource) {
        return;
      }

      const currentToken = getAccessToken();
      if (!currentToken) {
        return;
      }

      if (currentToken.trim().length < 10) {
        return;
      }

      const handleMessage = (event: NotificationStreamEvent) => {
        if (event.event === 'snapshot') {
          const unreadCount = event.data.unreadCount ?? 0;
          setUnreadCount(unreadCount);
          queryClient.invalidateQueries({ queryKey: ['notification'] });
        } else if (event.event === 'notification' || event.event === 'newNotification') {
          incrementUnreadCount();
          queryClient.invalidateQueries({ queryKey: ['notification'] });
        }
      };

      const handleError = (_error: Event) => {
        if (globalEventSource) {
          globalEventSource.close();
          globalEventSource = null;
        }
      };

      const stream = NotificationService.createNotificationStream(handleMessage, handleError);
      if (stream) {
        globalEventSource = stream;
        lastToken = currentToken;
      }
    }, delay);

    return () => {
      isMountedRef.current = false;

      if (isLoggedIn && getAccessToken()) {
        connectionCount--;

        if (connectionCount <= 0) {
          if (globalConnectTimeout) {
            clearTimeout(globalConnectTimeout);
            globalConnectTimeout = null;
          }
          if (globalEventSource) {
            globalEventSource.close();
            globalEventSource = null;
          }
          connectionCount = 0;
        }
      }
    };
  }, [
    isLoggedIn,
    currentToken, // 토큰 변경 감지
    options?.waitForHomeData,
    options?.homeDataLoaded,
    setUnreadCount,
    incrementUnreadCount,
    queryClient,
  ]);

  return globalEventSource;
};
