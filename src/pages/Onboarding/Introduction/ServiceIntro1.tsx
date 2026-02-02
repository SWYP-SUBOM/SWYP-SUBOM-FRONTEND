import { useEffect } from 'react';
import onboardingServiceIntro1 from '../../../assets/Onboarding/onboardingServiceIntro1.gif';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { GAEvents } from '../../../utils/GAEvent';
import { ProgressIndicator } from '../_components/ProgressIndicator';

export const ServiceIntro1 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();
  useThemeColor('#f3f5f8');

  useEffect(() => {
    GAEvents.onboardingView();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[0]} total={2} />

      <div className="flex-1 flex flex-col min-h-0">
        <OnboardingLayout
          title={
            <>
              <div>AI가 대신 써주는 시대,</div>
              <div>우리는 점점 덜 생각하게 되었어요</div>
            </>
          }
          subtitle={
            <>
              <div>편리함은 늘었지만,</div>
              <div>내 생각과 말은 점점 희미해지고 있어요</div>
            </>
          }
          image={{
            src: onboardingServiceIntro1,
            alt: 'ServiceIntro1',
            className: 'w-[244px] h-[244px]',
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
