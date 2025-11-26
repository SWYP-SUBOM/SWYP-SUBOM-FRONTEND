import { apiClient } from '../../utils/apiClient';
// import { getAccessToken } from '../../utils/api'; // SSE 관련 코드 주석처리
import { NOTIFICATION_ENDPOINTS } from '../endpoints';
import type { NotificationResponse } from '../types/notification';
// import type { NotificationStreamEvent } from '../types/notification'; // SSE 관련 코드 주석처리

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

// SSE 관련 코드 주석처리
// export const createNotificationStream = (
//   onMessage: (event: NotificationStreamEvent) => void,
//   onError?: (error: Event) => void,
// ): { close: () => void } | null => {
//   if (typeof window === 'undefined') return null;

//   const token = getAccessToken();
//   if (!token) {
//     console.warn('알림 스트림 연결 실패: 토큰이 없습니다');
//     return null;
//   }

//   const baseURL = import.meta.env.VITE_API_BASE_URL || '';
//   const url = `${baseURL}${NOTIFICATION_ENDPOINTS.NOTIFICATION_STREAM}`;

//   console.log('알림 스트림 연결 시작:', url);
//   console.log('토큰 존재 여부:', !!token);
//   console.log('토큰 길이:', token?.length);
//   console.log('전체 Authorization 헤더:', `Bearer ${token}`);

//   let abortController: AbortController | null = new AbortController();
//   let isClosed = false;

//   const fetchStream = async () => {
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           Accept: 'text/event-stream',
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: 'include',
//         signal: abortController?.signal,
//       });

//       console.log('알림 스트림 응답 상태:', {
//         status: response.status,
//         statusText: response.statusText,
//         ok: response.ok,
//       });

//       if (!response.ok) {
//         console.error('알림 스트림 HTTP 에러:', response.status, response.statusText);
//         if (response.status === 401 || response.status === 403) {
//           console.error('알림 스트림: 인증 실패', response.status);
//           if (onError) {
//             onError(new Event('auth_error'));
//           }
//           return;
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       if (!response.body) {
//         console.error('알림 스트림: Response body is null');
//         throw new Error('Response body is null');
//       }

//       console.log('알림 스트림 연결 성공');
//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let buffer = '';

//       while (true) {
//         if (isClosed) {
//           console.log('알림 스트림: isClosed가 true, 연결 종료');
//           reader.cancel().catch(() => {});
//           break;
//         }

//         const { done, value } = await reader.read();
//         if (done) {
//           console.log('알림 스트림: 읽기 완료 (done=true)');
//           break;
//         }

//         if (!value) {
//           console.log('알림 스트림: value가 null, 계속 대기');
//           continue;
//         }

//         const decoded = decoder.decode(value, { stream: true });
//         console.log(
//           '알림 스트림: 데이터 수신 (길이:',
//           decoded.length,
//           ')',
//           decoded.substring(0, 100),
//         );
//         buffer += decoded;
//         const lines = buffer.split('\n');
//         buffer = lines.pop() || '';

//         let eventType = '';
//         let eventData = '';

//         for (const line of lines) {
//           const trimmedLine = line.trim();
//           if (trimmedLine.startsWith('event:')) {
//             eventType = trimmedLine.substring(6).trim();
//             console.log('알림 스트림: event 타입 발견:', eventType);
//           } else if (trimmedLine.startsWith('data:')) {
//             eventData += trimmedLine.substring(5).trim();
//             console.log('알림 스트림: data 발견:', eventData.substring(0, 50));
//           } else if (trimmedLine === '') {
//             if (eventData && eventType) {
//               try {
//                 const data = JSON.parse(eventData);
//                 console.log(`알림 스트림 ${eventType} 이벤트 수신:`, data);
//                 if (eventType === 'snapshot' || eventType === 'notification') {
//                   onMessage({ event: eventType as 'snapshot' | 'notification', data });
//                 }
//               } catch (error) {
//                 console.error('알림 스트림 데이터 파싱 에러:', error, 'eventData:', eventData);
//               }
//               eventData = '';
//               eventType = '';
//             }
//           }
//         }
//       }
//     } catch (error) {
//       if (error instanceof Error && error.name === 'AbortError') {
//         return;
//       }

//       if (!isClosed && onError) {
//         onError(new Event('error'));
//       }
//       console.error('알림 스트림 에러:', error);
//     }
//   };

//   fetchStream();

//   return {
//     close: () => {
//       console.log('알림 스트림 연결 종료');
//       isClosed = true;
//       if (abortController) {
//         abortController.abort();
//         abortController = null;
//       }
//     },
//   };
// };

export const NotificationService = {
  getNotification,
  // createNotificationStream, // SSE 관련 코드 주석처리
};
