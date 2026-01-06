import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function GAPageView() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    if (import.meta.env.VERCEL_ENV !== 'production') return;

    window.gtag('config', import.meta.env.VITE_GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}
