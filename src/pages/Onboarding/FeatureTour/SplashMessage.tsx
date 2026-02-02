import { useEffect } from 'react';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';
import { useGetUserName } from '../../../hooks/User/useGetUserName';
import { useThemeColor } from '../../../hooks/useThemecolor';

export const SplashMessage = () => {
  const { handleNext } = useOnboardingNavigation();
  const { data: userName, isLoading } = useGetUserName();
  useThemeColor('#2276ff');

  useEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 2000);
  }, [handleNext]);

  return (
    <div className="h-screen bg-b7 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center">
        <div className="T01_B">
          환영해요, {isLoading ? '...' : userName ? `${userName}님` : '님'}
        </div>
      </div>
    </div>
  );
};
