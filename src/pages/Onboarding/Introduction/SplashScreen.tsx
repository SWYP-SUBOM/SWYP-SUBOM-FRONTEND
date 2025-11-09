import onboardingLogo from '../../../assets/onboarding/onboardingLogo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/onboarding/intro1');
    }, 2000);
  }, []);
  return (
    <div className="h-screen bg-b7 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center">
        <div className="T02_B">AI 시대,</div>
        <div className="T02_B">나의 언어를 지키는 루틴</div>
      </div>
      <div className=" w-[210px] h-[54px]flex mt-[24px] justify-center items-center">
        <img src={onboardingLogo} alt="onboardingLogo" />
      </div>
    </div>
  );
};
