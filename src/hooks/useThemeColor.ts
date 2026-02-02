import { useEffect } from 'react';

export const useThemeColor = (color: string) => {
  useEffect(() => {
    // 1. theme-color 메타 태그 제어
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    const previousColor = meta.getAttribute('content') || '#f9f9f9';
    meta.setAttribute('content', color);

    // 2. PWA/iOS 전용: status-bar-style 강제 업데이트 (필요 시)
    const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleMeta) {
      appleMeta.setAttribute('content', 'default');
    }

    return () => {
      meta.setAttribute('content', previousColor);
    };
  }, [color]);
};
