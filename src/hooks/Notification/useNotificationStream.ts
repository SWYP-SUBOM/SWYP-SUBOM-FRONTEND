// SSE 관련 코드 주석처리
// import { useEffect, useRef } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import { NotificationService } from '../../api/services/notificationService';
// import { useAuthStore } from '../../store/useAuthStore';
// import { useNotificationStore } from '../../store/useNotificationStore';
// import { getAccessToken } from '../../utils/api';
// import type { NotificationStreamEvent } from '../../api/types/notification';

// export const useNotificationStream = () => {
//   const { isLoggedIn } = useAuthStore();
//   const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
//   const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);
//   const queryClient = useQueryClient();
//   const streamRef = useRef<{ close: () => void } | null>(null);

//   useEffect(() => {
//     // 로그인 상태와 토큰 모두 확인
//     const token = getAccessToken();
//     const hasValidAuth = isLoggedIn && !!token;

//     if (!hasValidAuth) {
//       // 로그아웃 시 또는 토큰 없을 때 SSE 연결 종료 및 unreadCount 초기화
//       if (streamRef.current) {
//         streamRef.current.close();
//         streamRef.current = null;
//       }
//       setUnreadCount(0);
//       return;
//     }

//     // 이미 연결이 존재하면 새로 연결하지 않음 (무한 루프 방지)
//     if (streamRef.current) {
//       console.log('알림 스트림: 이미 연결되어 있음');
//       return;
//     }

//     // 로그인 직후 토큰이 완전히 설정될 때까지 약간의 지연
//     // Home 페이지로 이동한 직후 토큰이 localStorage에 저장되기까지 시간이 필요할 수 있음
//     // 다른 API 요청이 성공한 후에 SSE 연결을 시도하는 것이 더 안전함
//     const connectTimeout = setTimeout(() => {
//       const currentToken = getAccessToken();
//       if (!currentToken) {
//         console.warn('알림 스트림: 토큰이 아직 준비되지 않음');
//         return;
//       }

//       // 토큰 형식 검증 (Bearer 토큰은 일반적으로 길이가 있음)
//       if (currentToken.trim().length < 10) {
//         console.warn('알림 스트림: 토큰이 너무 짧음, 유효하지 않을 수 있음');
//         return;
//       }

//       // 로그인 상태이고 토큰이 있을 때만 SSE 연결
//       console.log('알림 스트림: 로그인 확인됨, 연결 시작');
//       console.log('토큰 검증 완료, 길이:', currentToken.length);

//       const handleMessage = (event: NotificationStreamEvent) => {
//         if (event.event === 'snapshot') {
//           // 초기 unreadCount 업데이트
//           const unreadCount = event.data.unreadCount ?? 0;
//           console.log('알림 스트림 snapshot: unreadCount 설정', unreadCount);
//           setUnreadCount(unreadCount);
//           queryClient.invalidateQueries({ queryKey: ['notification'] });
//         } else if (event.event === 'notification') {
//           // 새 알림 수신
//           console.log('알림 스트림 notification: unreadCount 증가 전');
//           incrementUnreadCount();
//           const currentCount = useNotificationStore.getState().unreadCount;
//           console.log('알림 스트림 notification: unreadCount 증가 후', currentCount);
//           queryClient.invalidateQueries({ queryKey: ['notification'] });
//         }
//       };

//       const handleError = (error: Event) => {
//         // 인증 에러인 경우 조용히 처리 (로그인 페이지로 리다이렉트 방지)
//         console.warn('알림 스트림: 에러 발생, 연결 중단', error);
//         if (streamRef.current) {
//           streamRef.current.close();
//           streamRef.current = null;
//         }
//         // 페이지 리다이렉트 방지 (에러만 로깅하고 조용히 처리)
//         return;
//       };

//       const stream = NotificationService.createNotificationStream(handleMessage, handleError);
//       if (stream) {
//         streamRef.current = stream;
//       }
//     }, 100); // 100ms 지연으로 토큰이 완전히 설정될 때까지 대기

//     return () => {
//       clearTimeout(connectTimeout);
//       // 컴포넌트 언마운트 시 연결 종료
//       if (streamRef.current) {
//         streamRef.current.close();
//         streamRef.current = null;
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoggedIn]);

//   return streamRef.current;
// };
