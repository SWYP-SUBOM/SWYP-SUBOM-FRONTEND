import guide1 from '../../../assets/Onboarding/guide1.png';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
export const GuideScreen1 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[0]} total={4} />

      <div className="flex-1 flex flex-col min-h-0">
        <OnboardingLayout
          title={
            <>
              <div>하루에 단 한번,</div>
              <div>원하는 주제로 글을 써봐요</div>
            </>
          }
          subtitle={
            <>
              <div>카테고리마다 매일</div>
              <div>새로운 주제가 열립니다.</div>
            </>
          }
          image={{
            src: guide1,
            alt: 'guide1',
            className: 'w-61 h-61',
          }}
        />
      </div>

      <div className="mt-auto w-full px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))] flex flex-col items-center">
        <Button label="다음으로" onClick={handleNext} />
        <button
          onClick={handleSkip}
          className="w-20 h-10  text-gray-700 B03_M underline cursor-pointer mt-[2dvh] active:bg-gray-400 active:scale-95  hover:bg-gray-400  rounded-lg transition-colors duration-300  "
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
};
