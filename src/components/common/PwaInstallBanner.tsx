interface Props {
  target: 'ios-safari' | 'ios-chrome' | 'android';
  onInstall: () => void;
  onClose: () => void;
}

export const PwaInstallBanner = ({ target, onInstall, onClose }: Props) => {
  const ua = navigator.userAgent.toLowerCase();
  const isInApp = /kakaotalk|instagram|fbav|line/.test(ua);

  return (
    <div className="fixed top-[56px] left-0 right-0 z-50 px-4 animate-in fade-in slide-in-from-top-4">
      <div className="rounded-xl bg-white border shadow-xl p-4 ring-1 ring-black/5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-bold text-slate-900">📲 앱 설치 가이드</p>
          <button onClick={onClose} className="text-slate-400">
            닫기
          </button>
        </div>

        {target === 'ios-safari' && (
          <p className="text-xs text-slate-600 leading-relaxed">
            {isInApp && (
              <>
                1. 우측 하단 <span className="font-bold text-blue-600">[공유 버튼]</span> 클릭 후{' '}
                <br />
                <span className="font-bold text-black">['Safari로 열기']</span> 선택
                <br />
                2.{' '}
              </>
            )}
            하단 바의 <span className="font-bold text-blue-600">[공유 버튼]</span>을 누른 뒤
            <br />
            <span className="font-bold text-black">['홈 화면에 추가']</span>를 선택해 주세요.
          </p>
        )}

        {target === 'ios-chrome' && (
          <p className="text-xs text-slate-600 leading-relaxed">
            주소창 우측의 <span className="font-bold text-blue-600">[공유 버튼]</span>을 누른 뒤
            <br />
            <span className="font-bold text-black">['홈 화면에 추가']</span>를 선택해 주세요.
          </p>
        )}

        {target === 'android' && (
          <div className="mt-2">
            <p className="text-xs text-slate-600 mb-3">
              {isInApp
                ? "우측 상단 메뉴를 눌러 '다른 브라우저로 열기'를 먼저 해주세요!"
                : '앱으로 설치하면 더 편리하게 이용할 수 있어요!'}
            </p>
            <button
              onClick={onInstall}
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium active:scale-95 transition-transform"
            >
              {isInApp ? '설치 방법 확인' : '지금 바로 설치하기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
