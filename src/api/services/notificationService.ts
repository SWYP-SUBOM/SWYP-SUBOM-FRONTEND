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
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let isClosed = false;
  let reconnectTimeout: number | null = null;

  const fetchStream = async () => {
    // 수동으로 닫힌 경우 재연결하지 않음
    if (isClosed) {
      return;
    }

    try {
      const currentToken = getAccessToken();
      if (!currentToken || currentToken.trim().length < 10) {
        // 토큰이 없거나 유효하지 않으면 재연결하지 않음
        // (토큰이 갱신되면 useNotificationStream에서 감지하여 재연결)
        return;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          Accept: 'text/event-stream',
        },
        credentials: 'include',
        signal: abortController.signal,
      });

      if (!response.ok) {
        // 401/403 에러 발생 시 토큰이 갱신되었는지 확인 후 재연결
        if (response.status === 401 || response.status === 403) {
          onError(new Event('unauthorized'));

          // 토큰이 갱신되었는지 확인하는 함수
          const checkAndReconnect = () => {
            const newToken = getAccessToken();
            // 토큰이 변경되었거나 유효한 토큰이 있으면 재연결
            if (newToken && newToken !== currentToken && newToken.trim().length >= 10) {
              fetchStream();
            } else {
              // 토큰이 아직 갱신되지 않았으면 더 기다림
              reconnectTimeout = window.setTimeout(checkAndReconnect, 2000);
            }
          };

          reconnectTimeout = window.setTimeout(checkAndReconnect, 2000); // 2초 후 확인
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      reader = response.body?.getReader() || null;
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body가 없습니다');
      }

      let buffer = '';
      let eventType = '';
      let eventData = '';

      try {
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
      } finally {
        // Reader 리소스 정리
        if (reader) {
          try {
            reader.releaseLock();
          } catch (e) {
            // 이미 해제된 경우 무시
          }
          reader = null;
        }
      }

      // 연결이 정상적으로 종료된 경우 (done === true)
      // 재연결 시도 (수동으로 닫힌 경우가 아닐 때만)
      if (!isClosed) {
        reconnectTimeout = window.setTimeout(() => {
          fetchStream();
        }, 3000); // 3초 후 재연결
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      // 에러 발생 시 재연결 시도 (수동으로 닫힌 경우가 아닐 때만)
      if (!isClosed) {
        reconnectTimeout = window.setTimeout(() => {
          fetchStream();
        }, 3000); // 3초 후 재연결
      }

      onError(error instanceof Event ? error : new Event('error'));
    }
  };

  fetchStream();

  return {
    close: () => {
      isClosed = true;
      abortController.abort();

      // 재연결 타이머 취소
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      // Reader가 있으면 정리
      if (reader) {
        try {
          reader.releaseLock();
        } catch (e) {
          // 이미 해제된 경우 무시
        }
        reader = null;
      }
    },
  };
};

export const NotificationService = {
  getNotification,
  createNotificationStream,
};
