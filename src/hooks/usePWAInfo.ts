import { useEffect, useState } from 'react';

export const usePWAInfo = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (userAgent.includes('mac') && navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default',
  );

  useEffect(() => {
    if (typeof Notification === 'undefined') return;

    setNotificationPermission(Notification.permission);

    const handleFocus = () => {
      setNotificationPermission(Notification.permission);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return { isIOS, isStandalone, notificationPermission };
};
