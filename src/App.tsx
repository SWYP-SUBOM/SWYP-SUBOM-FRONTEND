import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
