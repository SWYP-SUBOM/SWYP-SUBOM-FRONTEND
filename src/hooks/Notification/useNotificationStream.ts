import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '../../api/services/notificationService';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { getAccessToken } from '../../utils/api';
import type { NotificationStreamEvent } from '../../api/types/notification';

export const useNotificationStream = () => {
  const { isLoggedIn } = useAuthStore();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);
  const queryClient = useQueryClient();
  const streamRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    const hasValidAuth = isLoggedIn && !!token;

    if (!hasValidAuth) {
      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
      setUnreadCount(0);
      return;
    }

    if (streamRef.current) {
      return;
    }

    const connectTimeout = setTimeout(() => {
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
        if (streamRef.current) {
          streamRef.current.close();
          streamRef.current = null;
        }

        return;
      };

      const stream = NotificationService.createNotificationStream(handleMessage, handleError);
      if (stream) {
        streamRef.current = stream;
      }
    }, 100);

    return () => {
      clearTimeout(connectTimeout);

      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
    };
  }, [isLoggedIn]);

  return streamRef.current;
};
