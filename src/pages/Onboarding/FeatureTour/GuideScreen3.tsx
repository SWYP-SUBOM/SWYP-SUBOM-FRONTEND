import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { Button } from '../../../components/common/Button';
import guide3 from '../../../assets/Onboarding/guide3.png';
export const GuideScreen3 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[2]} total={4} />

      <div className="flex-1 flex flex-col min-h-0">
        <OnboardingLayout
          title={
            <>
              <div>내 글을</div>
              <div>한눈에 확인해보세요</div>
            </>
          }
          subtitle={
            <>
              <div>캘린더에서 나의 글을 한눈에 확인해보세요</div>
            </>
          }
          image={{
            src: guide3,
            alt: 'guide3',
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
