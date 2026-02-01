import React, { useEffect } from 'react';
import { GuestBottomSheet } from '../components/common/GuestBottomSheet';
import { useBottomSheet } from './useBottomSheet';


// 캘린더 페이지 비로그인일 때 지정한 시간(ms) 후 GuestBottomSheet를 띄움
export const useDelayedGuestBottomSheet = (show: boolean, delayMs: number) => {
  const { openBottomSheet } = useBottomSheet();

  useEffect(() => {
    if (!show) return;

    const timeoutId = setTimeout(() => {
      openBottomSheet(React.createElement(GuestBottomSheet));
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [show, delayMs, openBottomSheet]);
};
