import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import onboardingServiceIntro1 from '../../../assets/onboarding/onboardingServiceIntro1.gif';

export const ServiceIntro1 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();

  return (
    <>
      <ProgressIndicator activeIndexes={[0]} total={2} />

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
          className: 'w-61 h-61',
        }}
      />
      <div className="absolute top-[520px] sm:top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4  z-5">
        <button
          onClick={handleNext}
          className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 "
        >
          다음으로
        </button>
        <button
          onClick={handleSkip}
          className="w-20 h-10  text-gray-700 B03_M underline cursor-pointer mt-[2dvh] active:bg-gray-400 active:scale-95  hover:bg-gray-400  rounded-lg transition-colors duration-300  "
        >
          건너뛰기
        </button>
      </div>
    </>
  );
};
