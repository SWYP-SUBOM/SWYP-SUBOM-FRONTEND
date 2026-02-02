import guide2 from '../../../assets/Onboarding/guide2.png';
import { Button } from '../../../components/common/Button';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';
import { ProgressIndicator } from '../_components/ProgressIndicator';
export const GuideScreen2 = () => {
  const { handleNext } = useOnboardingNavigation();
  useThemeColor('#f3f5f8');
  return (
    <div className="min-h-dvh flex flex-col">
      <ProgressIndicator activeIndexes={[1]} total={4} />

      <div className="flex-1 flex flex-col ">
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
            className: 'sm:w-[328px] sm:h-[348px] w-[244px] h-[244px]',
          }}
        />
        <div className="w-full px-4 pt-6 pb-[calc(80px+env(safe-area-inset-bottom))] flex flex-col items-center">
          <Button label="다음으로" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
