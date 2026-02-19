import { Analytics } from '@vercel/analytics/react';
import { isSupported } from 'firebase/messaging';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const initServiceWorker = async () => {
      try {
        if (!('serviceWorker' in navigator)) return;

        // 인앱 브라우저에서 FCM을 지원하는지 비동기로 체크
        const supported = await isSupported();
        if (!supported) {
          console.log('FCM Not Supported in this browser');
          return;
        }

        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('FCM SW registered');
      } catch (error) {
        console.error('SW 등록 실패:', error);
      }
    };

    initServiceWorker();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
