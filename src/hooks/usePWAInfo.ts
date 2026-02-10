export const usePWAInfo = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (userAgent.includes('mac') && navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  const notificationPermission =
    typeof Notification !== 'undefined' ? Notification.permission : 'default';

  return { isIOS, isStandalone, notificationPermission };
};
