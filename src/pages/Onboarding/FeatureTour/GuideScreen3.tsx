import guide3 from '../../../assets/Onboarding/guide3.png';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
export const GuideScreen3 = () => {
  const { handleNext } = useOnboardingNavigation();
  useThemeColor('#f3f5f8');
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[2]} total={4} />

      <div className="flex-1 flex flex-col ">
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
            className: 'sm:w-[328px] sm:h-[348px] w-[244px] h-[244px] sm:mt-[20px] mt-[18px]',
          }}
        />
        <div className="w-full px-4 pt-6 pb-[calc(80px+env(safe-area-inset-bottom))] flex flex-col items-center">
          <Button label="다음으로" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
