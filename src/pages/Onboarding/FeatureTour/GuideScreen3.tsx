import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';

import guide3 from '../../../assets/onboarding/Guide3.png';
export const GuideScreen3 = () => {
  return (
    <div className="app-root">
      <ProgressIndicator activeIndexes={[2]} total={3} />

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
        }}
      />
      <div className="absolute top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4  z-5">
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          시작하기
        </button>
      </div>
    </div>
  );
};
