import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../../../layout/Onboarding/ProgressIndicator';

import guide4 from '../../../assets/onboarding/Guide4.png';
export const GuideScreen4 = () => {
  return (
    <>
      <ProgressIndicator activeIndexes={[2]} total={3} />

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
        }}
      />
      <div className="flex flex-col justify-center items-center px-4 mt-[30px] sm:mt-[76px] ">
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          시작하기
        </button>
      </div>
    </>
  );
};
