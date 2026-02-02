import guide4 from '../../../assets/Onboarding/guide4.png';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { GAEvents } from '../../../utils/GAEvent';
import { ProgressIndicator } from '../_components/ProgressIndicator';

export const GuideScreen4 = () => {
  const { handleNext } = useOnboardingNavigation();
  useThemeColor('#f3f5f8');

  const handleComplete = () => {
    GAEvents.onboardingComplete();
    handleNext();
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[3]} total={4} />

      <div className="flex-1 flex flex-col ">
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
            className: 'w-[328px] h-[348px] ',
          }}
        />
        <div className="w-full px-4 pt-9 pb-[calc(20px+env(safe-area-inset-bottom))] flex flex-col items-center">
          <Button label="홈으로 돌아가기" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
