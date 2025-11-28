import { apiClient } from '../../utils/apiClient';
import { NOTIFICATION_ENDPOINTS, OAUTH_ENDPOINTS } from '../endpoints';
import {
  getAccessToken,
  setAccessToken,
  isTokenExpiringSoon,
  getTokenExpiration,
} from '../../utils/api';
import { axiosInstance } from '../../utils/apiClient';
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

  let abortController: AbortController | null = new AbortController();
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let isClosed = false;
  let reconnectTimeout: number | null = null;
  let refreshAttemptCount = 0;
  let tokenRefreshTimer: number | null = null;
  let lastDataReceivedTime: number = Date.now();
  let connectionHealthTimer: number | null = null;
  const MAX_REFRESH_ATTEMPTS = 3;
  const CONNECTION_HEALTH_CHECK_INTERVAL = 2 * 60 * 1000; // 2분마다 체크 (백엔드 타임아웃 전에 재연결)

  // 토큰 만료 전에 미리 갱신하는 함수
  const refreshTokenBeforeExpiry = async () => {
    if (isClosed) return;

    const currentToken = getAccessToken();
    if (!currentToken || currentToken.trim().length < 10) return;

    // 토큰이 곧 만료될 예정이면 미리 갱신
    if (isTokenExpiringSoon(currentToken, 2)) {
      try {
        const refreshResponse = await axiosInstance.post(
          OAUTH_ENDPOINTS.REISSUE,
          {},
          {
            headers: {
              Authorization: undefined,
            },
          },
        );

        const authorizationHeader =
          refreshResponse.headers.authorization || refreshResponse.headers.Authorization;
        if (authorizationHeader) {
          const newToken =
            typeof authorizationHeader === 'string'
              ? authorizationHeader.replace('Bearer ', '')
              : authorizationHeader[0]?.replace('Bearer ', '') || '';

          if (newToken) {
            setAccessToken(newToken);
            // 토큰이 갱신되었으면 SSE 재연결
            // 기존 타이머들 취소
            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
              reconnectTimeout = null;
            }
            if (connectionHealthTimer) {
              clearTimeout(connectionHealthTimer);
              connectionHealthTimer = null;
            }
            fetchStream()
              .catch((err) => {
                console.error('SSE 재연결 실패:', err);
                onError(new Event('error'));
              })
              .catch((err) => {
                // 이중 catch로 모든 에러 처리
                console.error('SSE 재연결 에러 처리 실패:', err);
              });

            const newExpiration = getTokenExpiration(newToken);
            if (newExpiration) {
              const now = Date.now();
              const timeUntilExpiry = newExpiration - now;
              const checkTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 60000);

              if (tokenRefreshTimer) {
                clearTimeout(tokenRefreshTimer);
              }
              tokenRefreshTimer = window.setTimeout(refreshTokenBeforeExpiry, checkTime);
            }
            return; // 토큰 갱신 성공 시 함수 종료
          }
        }
      } catch (refreshError) {
        console.error('토큰 미리 갱신 실패:', refreshError);
      }
    }

    // 다음 체크 시간 계산 (만료 시간의 2분 전)
    const expiration = getTokenExpiration(currentToken);
    if (expiration) {
      const now = Date.now();
      const timeUntilExpiry = expiration - now;
      const checkTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 60000);

      if (tokenRefreshTimer) {
        clearTimeout(tokenRefreshTimer);
      }
      tokenRefreshTimer = window.setTimeout(refreshTokenBeforeExpiry, checkTime);
    }
  };

  const fetchStream = async () => {
    // 수동으로 닫힌 경우 재연결하지 않음
    if (isClosed) {
      return;
    }

    // 기존 재연결 타이머 취소
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    // 기존 reader 정리
    if (reader) {
      try {
        // reader를 취소하여 백엔드 연결도 정리
        reader.cancel().catch(() => {
          // 취소 실패는 무시
        });
        reader.releaseLock();
      } catch (e) {
        // 이미 해제된 경우 무시
      }
      reader = null;
    }

    // 새로운 AbortController 생성 (재연결 시마다 새로 생성)
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    try {
      const currentToken = getAccessToken();
      if (!currentToken || currentToken.trim().length < 10) {
        return;
      }

      // 토큰 만료 전 갱신 타이머 설정
      const expiration = getTokenExpiration(currentToken);
      if (expiration) {
        const now = Date.now();
        const timeUntilExpiry = expiration - now;
        const checkTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 60000); // 만료 2분 전 또는 최소 1분 후

        if (tokenRefreshTimer) {
          clearTimeout(tokenRefreshTimer);
        }
        tokenRefreshTimer = window.setTimeout(refreshTokenBeforeExpiry, checkTime);
      }

      // 연결 상태 체크 타이머 설정 (타임아웃 전에 재연결)
      lastDataReceivedTime = Date.now();
      const checkConnectionHealth = () => {
        if (isClosed) return;

        const timeSinceLastData = Date.now() - lastDataReceivedTime;
        // 4분 이상 데이터가 없으면 재연결 (타임아웃 전에 재연결)
        if (timeSinceLastData >= CONNECTION_HEALTH_CHECK_INTERVAL) {
          console.log('연결 상태 체크: 데이터 수신 없음, 재연결 시도');
          // 기존 타이머들 취소
          if (connectionHealthTimer) {
            clearTimeout(connectionHealthTimer);
            connectionHealthTimer = null;
          }
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
          }
          fetchStream().catch((err) => {
            console.error('SSE 재연결 실패:', err);
            onError(new Event('error'));
          });
        } else {
          // 다음 체크 예약
          connectionHealthTimer = window.setTimeout(
            checkConnectionHealth,
            CONNECTION_HEALTH_CHECK_INTERVAL,
          );
        }
      };

      if (connectionHealthTimer) {
        clearTimeout(connectionHealthTimer);
      }
      connectionHealthTimer = window.setTimeout(
        checkConnectionHealth,
        CONNECTION_HEALTH_CHECK_INTERVAL,
      );

      // fetch 타임아웃 설정 (30초)
      const fetchTimeout = 30000;
      const fetchTimeoutId = setTimeout(() => {
        if (abortController && !abortController.signal.aborted) {
          abortController.abort();
        }
      }, fetchTimeout);

      let response: Response;
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${currentToken}`,
            Accept: 'text/event-stream',
          },
          credentials: 'include',
          signal: abortController?.signal,
        });
        clearTimeout(fetchTimeoutId);
      } catch (fetchError) {
        clearTimeout(fetchTimeoutId);
        throw fetchError;
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          onError(new Event('unauthorized'));

          const refreshToken = async () => {
            if (refreshAttemptCount >= MAX_REFRESH_ATTEMPTS) {
              return;
            }

            refreshAttemptCount++;

            try {
              const refreshResponse = await axiosInstance.post(
                OAUTH_ENDPOINTS.REISSUE,
                {},
                {
                  headers: {
                    Authorization: undefined,
                  },
                },
              );

              const authorizationHeader =
                refreshResponse.headers.authorization || refreshResponse.headers.Authorization;
              if (authorizationHeader) {
                const newToken =
                  typeof authorizationHeader === 'string'
                    ? authorizationHeader.replace('Bearer ', '')
                    : authorizationHeader[0]?.replace('Bearer ', '') || '';

                if (newToken) {
                  setAccessToken(newToken);
                  refreshAttemptCount = 0;

                  // 기존 재연결 타이머 취소
                  if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                    reconnectTimeout = null;
                  }
                  if (connectionHealthTimer) {
                    clearTimeout(connectionHealthTimer);
                    connectionHealthTimer = null;
                  }

                  // 새 토큰의 만료 시간 기준으로 타이머 재설정
                  const newExpiration = getTokenExpiration(newToken);
                  if (newExpiration) {
                    const now = Date.now();
                    const timeUntilExpiry = newExpiration - now;
                    const checkTime = Math.max(timeUntilExpiry - 2 * 60 * 1000, 60000); // 만료 2분 전 또는 최소 1분 후

                    if (tokenRefreshTimer) {
                      clearTimeout(tokenRefreshTimer);
                    }
                    tokenRefreshTimer = window.setTimeout(refreshTokenBeforeExpiry, checkTime);
                  }

                  fetchStream().catch((err) => {
                    console.error('SSE 재연결 실패:', err);
                    onError(new Event('error'));
                  });
                  return;
                }
              }
            } catch (refreshError) {
              console.error('토큰 갱신 실패:', refreshError);

              if (refreshError && typeof refreshError === 'object' && 'response' in refreshError) {
                const axiosError = refreshError as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                  console.error('리프레시 토큰 만료 - 재시도 중단');
                  return;
                }
              }
            }

            if (refreshAttemptCount < MAX_REFRESH_ATTEMPTS) {
              if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
              }
              reconnectTimeout = window.setTimeout(() => {
                reconnectTimeout = null;
                refreshToken();
              }, 5000);
            }
          };

          refreshAttemptCount = 0; // 초기화
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
          }
          reconnectTimeout = window.setTimeout(() => {
            reconnectTimeout = null;
            refreshToken();
          }, 1000);
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

      // reader.read() 타임아웃 설정 (60초)
      const readTimeout = 60000;
      let readTimeoutId: number | null = null;

      try {
        while (true) {
          let readResult: ReadableStreamReadResult<Uint8Array>;
          try {
            // reader.read()에 타임아웃 적용
            const readPromise = reader.read();
            const timeoutPromise = new Promise<ReadableStreamReadResult<Uint8Array>>(
              (_, reject) => {
                readTimeoutId = window.setTimeout(() => {
                  readTimeoutId = null;
                  reject(new Error('Read timeout'));
                }, readTimeout);
              },
            );

            readResult = await Promise.race([readPromise, timeoutPromise]);

            // 성공적으로 읽었으면 타임아웃 정리
            if (readTimeoutId) {
              clearTimeout(readTimeoutId);
              readTimeoutId = null;
            }
          } catch (readError) {
            // 타임아웃 정리
            if (readTimeoutId) {
              clearTimeout(readTimeoutId);
              readTimeoutId = null;
            }
            // 타임아웃 또는 네트워크 에러 발생 시 재연결
            if (readError instanceof Error && readError.message === 'Read timeout') {
              console.log('Reader 타임아웃 발생, 재연결 시도');
            }
            throw readError;
          }

          const { done, value } = readResult;

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          lastDataReceivedTime = Date.now(); // 데이터 수신 시간 업데이트
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
        // 타임아웃 정리
        if (readTimeoutId) {
          clearTimeout(readTimeoutId);
          readTimeoutId = null;
        }

        // Reader 리소스 정리
        if (reader) {
          try {
            // reader를 취소하여 백엔드 연결도 정리
            reader.cancel().catch(() => {
              // 취소 실패는 무시
            });
            reader.releaseLock();
          } catch (e) {
            // 이미 해제된 경우 무시
          }
          reader = null;
        }

        // 연결이 정상적으로 종료된 경우 (done === true)
        // 재연결 시도 (수동으로 닫힌 경우가 아닐 때만)
        if (!isClosed) {
          // 연결 상태 체크 타이머 취소
          if (connectionHealthTimer) {
            clearTimeout(connectionHealthTimer);
            connectionHealthTimer = null;
          }

          // 기존 재연결 타이머가 있으면 취소
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
          }
          reconnectTimeout = window.setTimeout(() => {
            reconnectTimeout = null; // 타이머 실행 후 초기화
            fetchStream().catch((err) => {
              // 재연결 실패 시 에러 처리
              console.error('SSE 재연결 실패:', err);
              onError(new Event('error'));
            });
          }, 3000); // 3초 후 재연결
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError' && isClosed) {
        return;
      }

      if (!isClosed) {
        // 연결 상태 체크 타이머 취소
        if (connectionHealthTimer) {
          clearTimeout(connectionHealthTimer);
          connectionHealthTimer = null;
        }

        // 기존 재연결 타이머가 있으면 취소
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
        reconnectTimeout = window.setTimeout(() => {
          reconnectTimeout = null; // 타이머 실행 후 초기화
          fetchStream().catch((err) => {
            // 재연결 실패 시 에러 처리
            console.error('SSE 재연결 실패:', err);
            onError(new Event('error'));
          });
        }, 3000); // 3초 후 재연결
      }

      onError(error instanceof Event ? error : new Event('error'));
    }
  };

  fetchStream().catch((err) => {
    // 초기 연결 실패 시 에러 처리
    console.error('SSE 초기 연결 실패:', err);
    onError(new Event('error'));
  });

  return {
    close: () => {
      isClosed = true;

      if (abortController) {
        abortController.abort();
        abortController = null;
      }

      refreshAttemptCount = 0; // 카운터 리셋

      // 재연결 타이머 취소
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      // 토큰 갱신 타이머 취소
      if (tokenRefreshTimer) {
        clearTimeout(tokenRefreshTimer);
        tokenRefreshTimer = null;
      }

      // 연결 상태 체크 타이머 취소
      if (connectionHealthTimer) {
        clearTimeout(connectionHealthTimer);
        connectionHealthTimer = null;
      }

      // Reader가 있으면 정리
      if (reader) {
        try {
          // reader를 취소하여 백엔드 연결도 정리
          reader.cancel().catch(() => {
            // 취소 실패는 무시
          });
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
