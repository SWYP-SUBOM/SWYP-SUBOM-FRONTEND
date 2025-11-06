import { useEffect } from 'react';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
export const SplashMessage = () => {
  const { handleNext } = useOnboardingNavigation();
  useEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 2000);
  }, []);
  return (
    <div className="h-screen bg-b7 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center">
        <div className="T01_B">환영해요, 김진영님</div>
      </div>
    </div>
  );
};
