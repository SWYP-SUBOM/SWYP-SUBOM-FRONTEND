import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useModal } from './hooks/useModal';
import { router } from './routes/router';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const { isOpen, Content } = useModal();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      {isOpen && Content}
    </>
  );
}

export default App;
