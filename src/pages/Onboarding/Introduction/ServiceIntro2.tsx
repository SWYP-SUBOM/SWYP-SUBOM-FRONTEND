import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
import onboardingServiceIntro2 from '../../../assets/onboarding/onboardingServiceIntro2.gif';

export const ServiceIntro2 = () => {
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
            <div>생각을 되살리고, 표현을 단단히</div>
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
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          다음으로
        </button>
        <button className="w-20 h-10  text-gray-700 B03_M underline cursor-pointer mt-[2dvh] active:bg-gray-400 active:scale-95  hover:bg-gray-400  rounded-lg transition-colors duration-300  ">
          건너뛰기
        </button>
      </div>
    </>
  );
};
