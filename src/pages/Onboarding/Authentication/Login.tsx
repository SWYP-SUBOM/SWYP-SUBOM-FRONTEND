import { OnboardingLayout } from '../../../layout/Onboarding/OnboardingLayout';

import onboardingLogin from '../../../assets/onboarding/onboardingLogin.gif';
import kakao from '../../../assets/Onboarding/kakao.png';
export const Login = () => {
  return (
    <div className="app-root bg-b7">
      <OnboardingLayout
        title={
          <div className="text-white">
            <div>AI시대,</div>
            <div>나의 언어를 지키는 루틴</div>
          </div>
        }
        subtitle={
          <div className="text-white">
            <div>생각을 되살리고 표현을 단단히,</div>
            <div>오늘부터 당신의 루틴이 시작돼요</div>
          </div>
        }
        image={{
          src: onboardingLogin,
          alt: 'onboardingLogin',
          className: 'w-61 h-61',
        }}
      />
      <div className="absolute top-[520px] sm:top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4  z-5">
        <div className=" w-full h-14 justify-center flex items-center gap-2 bg-[#fee500] rounded-xl text-gray-900 B02_B cursor-pointer active:bg-[#e1ca00] active:scale-95  hover:bg-[#e1ca00]   transition-colors duration-300">
          <img className="w-4 h-4" src={kakao} alt="kakao" />
          <button>카카오톡으로 로그인하기</button>
        </div>
        <button className="w-[174px] h-10  B03_M  cursor-pointer mt-[10px] text-white active:bg-b8 active:scale-95  hover:bg-b8  rounded-xl transition-colors duration-300  ">
          쓰기전에 둘러보기
        </button>
      </div>
    </div>
  );
};
