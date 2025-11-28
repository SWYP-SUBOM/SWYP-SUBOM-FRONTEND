import { apiClient } from '../../utils/apiClient';
import { NOTIFICATION_ENDPOINTS } from '../endpoints';
import { getAccessToken } from '../../utils/api';
import type { NotificationResponse, NotificationStreamEvent } from '../types/notification';

export const getNotification = async (
  limit = 10,
  cursor?: string,
): Promise<NotificationResponse['data']> => {
  let url = `${NOTIFICATION_ENDPOINTS.GET_NOTIFICATION}?limit=${limit}`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const response = await apiClient.get<NotificationResponse>(url);
  if (!response.data) {
    throw new Error('알람을 조회할 수 없습니다');
  }
  return response.data;
};

export const createNotificationStream = (
  onMessage: (event: NotificationStreamEvent) => void,
  onError: (error: Event) => void,
): { close: () => void } | null => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }

  const baseURL = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${baseURL}${NOTIFICATION_ENDPOINTS.NOTIFICATION_STREAM}`;

  const abortController = new AbortController();

  const fetchStream = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'text/event-stream',
        },
        credentials: 'include',
        signal: abortController.signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          onError(new Event('unauthorized'));
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body가 없습니다');
      }

      let buffer = '';
      let eventType = '';
      let eventData = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event:') || line.startsWith('event: ')) {
            eventType = line.replace(/^event:\s*/, '').trim();
          } else if (line.startsWith('data:') || line.startsWith('data: ')) {
            eventData = line.replace(/^data:\s*/, '').trim();
          } else if (line.trim() === '') {
            if (eventData) {
              try {
                const data = JSON.parse(eventData);
                const streamEvent: NotificationStreamEvent = {
                  event: (eventType || 'snapshot') as 'snapshot' | 'notification',
                  data,
                };
                onMessage(streamEvent);
              } catch (error) {}
            }
            eventType = '';
            eventData = '';
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      onError(error instanceof Event ? error : new Event('error'));
    }
  };

  fetchStream();

  return {
    close: () => {
      abortController.abort();
    },
  };
};

export const NotificationService = {
  getNotification,
  createNotificationStream,
};
