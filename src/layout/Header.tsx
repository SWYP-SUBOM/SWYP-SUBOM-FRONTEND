import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alarm from '../assets/Header/alarm.svg';
import logoImg from '../assets/Header/logo-img.svg';
import logoName from '../assets/Header/logo-name.png';
import { PwaInstallBanner } from '../components/common/PwaInstallBanner';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { useNotificationStore } from '../store/useNotificationStore';

export const Header = () => {
  const navigate = useNavigate();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const { target, canInstall, installApp } = usePwaInstall();
  const [showBanner, setShowBanner] = useState(false);

  const ua = navigator.userAgent.toLowerCase();
  const isInApp = /kakaotalk|instagram|fbav|line/.test(ua);

  return (
    <>
      <div className="flex justify-between w-full px-4 pt-[14px] items-center">
        <div className="flex gap-1">
          <img src={logoImg} className="w-9 h-6" alt="로고이미지" />
          <img src={logoName} className="w-11 h-6" alt="로고이름" />
        </div>

        <div className="flex items-center gap-3">
          {(canInstall || target !== 'none') && (
            <button
              onClick={() => setShowBanner(true)}
              className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-600 border border-slate-200 active:bg-slate-200 transition-colors"
            >
              {target.includes('ios') || isInApp ? '설치 가이드' : '앱 설치'}
            </button>
          )}

          <div className="relative cursor-pointer" onClick={() => navigate('/notification')}>
            <img src={alarm} className="w-9 h-6" alt="알림" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        </div>
      </div>

      {showBanner && target !== 'none' && (
        <PwaInstallBanner
          target={target}
          onInstall={() => {
            installApp();
            if (target === 'android' && !isInApp) setShowBanner(false);
          }}
          onClose={() => setShowBanner(false)}
        />
      )}
    </>
  );
};
