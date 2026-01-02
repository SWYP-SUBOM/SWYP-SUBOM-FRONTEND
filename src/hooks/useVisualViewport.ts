import { useEffect, useState } from 'react';

export const useVisualViewport = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [vvData, setVvData] = useState({
    height: window.innerHeight,
    offsetTop: 0,
  });

  useEffect(() => {
    if (!window.visualViewport) return;

    const updateViewport = () => {
      const vv = window.visualViewport!;

      // 1. 키보드 오픈 여부 판단 (85% 기준 유지)
      const isOpen = vv.height < window.innerHeight * 0.85;

      setIsKeyboardOpen(isOpen);
      setVvData({
        height: vv.height,
        offsetTop: vv.offsetTop, // 스크롤할 때마다 이 값이 변합니다.
      });
    };

    // iOS Safari는 키보드가 떴을 때 'scroll'과 'resize' 이벤트가 중요합니다.
    window.visualViewport.addEventListener('resize', updateViewport);
    window.visualViewport.addEventListener('scroll', updateViewport);

    updateViewport();

    return () => {
      window.visualViewport?.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('scroll', updateViewport);
    };
  }, []);

  return { isKeyboardOpen, ...vvData };
};
