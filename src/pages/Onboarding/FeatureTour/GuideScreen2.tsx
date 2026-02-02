import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { Button } from '../../../components/common/Button';
import guide2 from '../../../assets/Onboarding/guide2.png';
export const GuideScreen2 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[1]} total={4} />

      <OnboardingLayout
        title={
          <>
            <div>AI 피드백으로</div>
            <div>글을 더 깊게 완성하세요</div>
          </>
        }
        subtitle={
          <>
            <div>글을 작성하면, AI가 단순 교정이 아닌,</div>
            <div>논리와 표현의 피드백을 제시합니다.</div>
          </>
        }
        image={{
          src: guide2,
          alt: 'guide2',
          className: 'sm:w-[328px] sm:h-[348px] w-[244px] h-[244px]',
        }}
      />

      <div className="w-full px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))] flex flex-col items-center">
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
