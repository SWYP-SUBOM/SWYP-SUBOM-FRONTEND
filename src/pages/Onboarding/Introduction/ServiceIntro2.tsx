import onboardingServiceIntro2 from '../../../assets/onboarding/onboardingServiceIntro2.png';
export const ServiceIntro2 = () => {
  return (
    <div
      className="app-root flex flex-col "
      style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
    >
      <div className="absolute top-[50px] left-0 right-0 flex justify-center z-10">
        <div className="flex items-center gap-2.5 ">
          <div className="w-2 h-2 bg-gray-500 rounded-full" />
          <div className="w-4 h-2 bg-b7 rounded-[100px]" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center mt-[100px]  ">
        <div className="T02_B text-gray-900 ">AI가 대신 써주는 시대,</div>
        <div className="T02_B text-gray-900 ">우리는 점점 덜 생각하게 되었어요</div>

        <div className="B03_1_M text-gray-800 mt-[12px]">편리함은 늘었지만,</div>
        <div className="B03_1_M text-gray-800 ">내 생각과 말은 점점 희미해지고 있어요</div>
      </div>

      <div className="flex justify-center items-center mt-[74px]">
        <img
          src={onboardingServiceIntro2}
          alt="ServiceIntro2"
          className="w-61 h-61 object-contain"
        />
      </div>

      <div className="absolute left-0 right-0 flex flex-col justify-center items-center px-4 bottom-0 z-5">
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          다음으로
        </button>
        <button className="w-20 h-10  text-gray-700 B03_M underline cursor-pointer mt-[2dvh] active:bg-gray-400 active:scale-95  hover:bg-gray-400  rounded-lg transition-colors duration-300  ">
          건너뛰기
        </button>
      </div>
    </div>
  );
};
