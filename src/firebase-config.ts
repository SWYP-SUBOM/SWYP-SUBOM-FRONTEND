import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyC63fFJRwzNziuH8iO_-MzCl6aulAAJ6JE',
  authDomain: 'seobom-209fb.firebaseapp.com',
  projectId: 'seobom-209fb',
  storageBucket: 'seobom-209fb.firebasestorage.app',
  messagingSenderId: '15576632753',
  appId: '1:15576632753:web:1e0cf844ba3c5bb98cc190',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// VAPID KEY는 Firebase 콘솔 -> 설정 -> 클라우드 메시징에서 생성 가능
export const requestForToken = async () => {
  console.log('1. 토큰 요청 시작');
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return null;
    }

    const supported = await isSupported();
    if (!supported) return null;

    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    }
  } catch (error) {
    console.error('토큰 획득 실패:', error);
    return null;
  }
};
