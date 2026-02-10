import { onMessage } from 'firebase/messaging';
import { useCallback, useEffect } from 'react';
import { messaging, requestForToken } from '../firebase-config';
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
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('포그라운드 수신:', payload);

      if (payload.notification && Notification.permission === 'granted') {
        new Notification(payload.notification.title || '알림', {
          body: payload.notification.body,
          icon: '/pwaicon-192x192.png',
        });
      }
    });

    return () => unsubscribe();
  }, [handleRequestPermission]);

  return { handleRequestPermission };
};
