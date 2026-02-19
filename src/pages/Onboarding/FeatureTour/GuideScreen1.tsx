import guide1 from '../../../assets/Onboarding/guide1.webp';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
export const GuideScreen1 = () => {
  const { handleNext } = useOnboardingNavigation();
  useThemeColor('#f3f5f8');
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[0]} total={4} />

      <div className="flex-1 flex flex-col ">
        <OnboardingLayout
          title={
            <>
              <div>하루에 단 한번,</div>
              <div>원하는 주제로 글을 써봐요</div>
            </>
          }
          subtitle={
            <>
              <div>카테고리마다 매일</div>
              <div>새로운 주제가 열립니다.</div>
            </>
          }
          image={{
            src: guide1,
            alt: 'guide1',
            className: 'w-[328px] h-[348px]',
          }}
        />
        <div className="w-full px-4 pt-6 pb-[calc(20px+env(safe-area-inset-bottom))] flex flex-col items-center">
          <Button label="다음으로" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
