import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import onboardingServiceIntro2 from '../../../assets/Onboarding/onboardingServiceIntro2.gif';
import { Button } from '../../../components/common/Button';

export const ServiceIntro2 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();

  return (
    <>
      <ProgressIndicator activeIndexes={[1]} total={2} />

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
      <div className="absolute top-[520px] sm:top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4  z-5">
        <Button label="다음으로" onClick={handleNext} />
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
