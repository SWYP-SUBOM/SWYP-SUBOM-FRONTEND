import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import onboardingServiceIntro2 from '../../../assets/Onboarding/onboardingServiceIntro2.gif';
import { Button } from '../../../components/common/Button';

export const ServiceIntro2 = () => {
  const { handleNext } = useOnboardingNavigation();

  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[1]} total={2} />

      <div className="flex-1 flex flex-col min-h-0">
        <OnboardingLayout
          title={
            <>
              <div>매일 한 번의 글쓰기 훈련으로</div>
              <div>나의 언어를 되찾아요!</div>
            </>
          }
          subtitle={
            <>
              <div>생각을 되살리고, 표현을 단단히!</div>
              <div>오늘부터 당신의 루틴이 시작돼요.</div>
            </>
          }
          image={{
            src: onboardingServiceIntro2,
            alt: 'ServiceIntro2',
            className: 'w-61 h-61',
          }}
        />
      </div>

      <div className="mt-auto w-full px-4 pt-4 pb-[calc(80px+env(safe-area-inset-bottom))] flex flex-col items-center">
        <Button label="다음으로" onClick={handleNext} />
       
      </div>
    </div>
  );
};
