import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '../../api/services/notificationService';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { getAccessToken } from '../../utils/api';
import type { NotificationStreamEvent } from '../../api/types/notification';

let globalEventSource: { close: () => void } | null = null;
let globalConnectTimeout: number | null = null;
let connectionCount = 0;

export const useNotificationStream = () => {
  const { isLoggedIn } = useAuthStore();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);
  const queryClient = useQueryClient();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const token = getAccessToken();
    const hasValidAuth = isLoggedIn && !!token;

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
      return;
    }

    connectionCount++;

    if (globalEventSource) {
      return;
    }

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
        } else if (event.event === 'notification') {
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
      }
    }, 100);

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
  }, [isLoggedIn, setUnreadCount, incrementUnreadCount, queryClient]);

  return globalEventSource;
};
