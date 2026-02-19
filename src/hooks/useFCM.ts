import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { useCallback, useEffect } from 'react';
import { requestForToken } from '../firebase-config';
import { usePostFCMToken } from './Fcm/usePostFCMToken';

export const useFCM = () => {
  const { mutate: saveTokenToServer } = usePostFCMToken();

  const handleRequestPermission = useCallback(async () => {
    const token = await requestForToken();
    if (token) {
      saveTokenToServer(token);
    }
    return token;
  }, [saveTokenToServer]);

  useEffect(() => {
    let unsubscribe: () => void;

    const setupOnMessage = async () => {
      try {
        // 1. 브라우저 지원 여부 확인
        const supported = await isSupported();
        if (!supported || !('Notification' in window)) return;

        // 2. 지원하는 경우에만 messaging 객체 생성
        const firebaseConfig = {
          apiKey: 'AIzaSyC63fFJRwzNziuH8iO_-MzCl6aulAAJ6JE',
          authDomain: 'seobom-209fb.firebaseapp.com',
          projectId: 'seobom-209fb',
          storageBucket: 'seobom-209fb.firebasestorage.app',
          messagingSenderId: '15576632753',
          appId: '1:15576632753:web:1e0cf844ba3c5bb98cc190',
        };
        const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        const messagingInstance = getMessaging(app);

        // 3. 포그라운드 메시지 수신 대기
        unsubscribe = onMessage(messagingInstance, (payload) => {
          console.log('포그라운드 수신:', payload);
          if (payload.notification && Notification.permission === 'granted') {
            new Notification(payload.notification.title || '알림', {
              body: payload.notification.body,
              icon: '/pwaicon-192x192.png',
            });
          }
        });
      } catch (error) {
        console.error('FCM 포그라운드 설정 실패:', error);
      }
    };

    setupOnMessage();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []); // 의존성 배열에서 handleRequestPermission은 빼도 무방합니다.

  return { handleRequestPermission };
};
