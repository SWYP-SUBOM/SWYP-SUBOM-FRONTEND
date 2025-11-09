import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';

import guide2 from '../../../assets/onboarding/Guide2.png';
export const GuideScreen2 = () => {
  const { handleNext, handleSkip } = useOnboardingNavigation();
  return (
    <>
      <ProgressIndicator activeIndexes={[1]} total={3} />

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
