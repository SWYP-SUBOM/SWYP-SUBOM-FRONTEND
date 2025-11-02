import onboardingLogin from '../../../assets/onboarding/onboardingLogin.png';
import kakao from '../../../assets/Onboarding/kakao.png';
export const Login = () => {
  return (
    <div
      className="app-root flex flex-col  bg-b7 text-white pt-[100px]"
      style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
    >
      <div className="flex flex-col items-center T02_B">
        <div>AI 시대,</div>
        <div>나의 언어를 지키는 루틴</div>

        <div className="B03_1_M mt-[12px]">생각을 되살리고, 표현을 단단히</div>
        <div className="B03_1_M">오늘부터 당신의 루틴이 시작돼요.</div>
      </div>

      <div className="flex flex-col items-center mt-[114px] ">
        <img className="w-40 h-40 object-contain" src={onboardingLogin} alt="onboardingLogin" />
      </div>
      <div className="absolute left-0 right-0 flex flex-col justify-center items-center px-4 bottom-0 z-5">
        <div className=" w-full h-14 justify-center flex items-center gap-2 bg-[#fee500] rounded-xl text-gray-900 B02_B cursor-pointer active:bg-[#e1ca00] active:scale-95  hover:bg-[#e1ca00]   transition-colors duration-300">
          <img className="w-4 h-4" src={kakao} alt="kakao" />
          <button>카카오톡으로 로그인하기</button>
        </div>
        <button className="w-[174px] h-10  B03_M  cursor-pointer mt-[10px] active:bg-b8 active:scale-95  hover:bg-b8  rounded-xl transition-colors duration-300  ">
          쓰기전에 둘러보기
        </button>
      </div>
    </div>
  );
};
