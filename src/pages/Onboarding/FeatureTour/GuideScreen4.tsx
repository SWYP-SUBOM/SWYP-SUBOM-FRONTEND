import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { Button } from '../../../components/common/Button';
import guide4 from '../../../assets/Onboarding/guide4.png';
import { GAEvents } from '../../../utils/GAEvent';

export const GuideScreen4 = () => {
  const { handleNext } = useOnboardingNavigation();

  const handleComplete = () => {
    GAEvents.onboardingComplete();
    handleNext();
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[3]} total={4} />

      <div className="flex-1 flex flex-col min-h-0">
        <OnboardingLayout
          title={
            <>
              <div>글을 나누며</div>
              <div>사고를 확장하세요</div>
            </>
          }
          subtitle={
            <>
              <div>피드에서 다른 사람의 생각을 탐색해보세요.</div>
            </>
          }
          image={{
            src: guide4,
            alt: 'guide4',
            className: 'w-61 h-61',
          }}
        />
      </div>

      <div className="mt-auto w-full px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))] flex flex-col items-center">
        <Button label="시작하기" onClick={handleComplete} />
      </div>
    </div>
  );
};
