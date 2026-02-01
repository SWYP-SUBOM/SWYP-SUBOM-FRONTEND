import { useEffect, useState } from 'react';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const usePwaInstall = () => {
  const [target, setTarget] = useState<'ios-safari' | 'ios-chrome' | 'android' | 'none'>('none');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isStandalone =
      window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone) {
      setTarget('none');
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    // 인앱 브라우저 체크 (카카오, 인스타그램, 페이스북, 라인 등)
    const isInApp = /kakaotalk|instagram|fbav|line/.test(ua);

    // 1. iOS 처리
    if (isIos) {
      const isIosChrome = /crios/.test(ua);
      if (isIosChrome) {
        setTarget('ios-chrome');
      } else {
        // 인앱 브라우저여도 iOS는 결국 Safari 엔진 가이드를 따르는 것이 일반적입니다.
        setTarget('ios-safari');
      }
      return;
    }

    // 2. Android 처리
    if (isAndroid) {
      // 안드로이드 인앱 브라우저인 경우 beforeinstallprompt가 안 뜰 수 있으므로
      // 기본적으로 'android' 타겟을 설정하되, 설치 버튼 클릭 시 크롬으로 유도하거나 안내할 수 있습니다.
      const handler = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setTarget('android');
      };

      window.addEventListener('beforeinstallprompt', handler);

      // 인앱 브라우저인데 prompt가 안 뜰 경우를 대비해 타겟 강제 설정 (선택 사항)
      if (isInApp) {
        setTarget('android');
      }

      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const installApp = async () => {
    if (target === 'ios-safari' || target === 'ios-chrome') return;

    // 안드로이드 인앱 브라우저에서 deferredPrompt가 없는 경우 처리
    if (!deferredPrompt) {
      alert(
        "우측 상단 메뉴(⋮)를 눌러 '다른 브라우저로 열기' 또는 '홈 화면에 추가'를 선택해주세요.",
      );
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setTarget('none');
      setDeferredPrompt(null);
    }
  };

  return { target, canInstall: target !== 'none', installApp };
};
