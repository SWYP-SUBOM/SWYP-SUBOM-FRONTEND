import guide4 from '../../../assets/onboarding/Guide4.png';
export const GuideScreen4 = () => {
  return (
    <div
      className="app-root flex flex-col min-h-screen"
      style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
    >
      <div className="absolute sm:top-[107px] top-[50px] left-0 right-0 flex justify-center z-10">
        <div className="flex items-center gap-2.5 ">
          <div className="w-2 h-2 bg-gray-500 rounded-full" />
          <div className="w-2 h-2 bg-gray-500 rounded-full" />
          <div className="w-4 h-2 bg-b7 rounded-[100px]" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center mt-[80px] sm:mt-[154px] shrink-0 px-4">
        <div className="T02_B text-gray-900 ">글을 나누며</div>
        <div className="T02_B text-gray-900 ">사고를 확장하세요</div>

        <div className="B03_1_M text-gray-800 mt-[12px]">
          피드에서 다른 사람의 생각을 탐색해보세요.
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 sm:mt-[27px]  px-4 ">
        <img
          src={guide4}
          alt="guide4"
          className=" sm:max-h-[348px] sm:max-w-[328px] object-contain"
        />
      </div>

      <div className="flex flex-col justify-center items-center px-4  sm:mt-[32px] ">
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          시작하기
        </button>
      </div>
    </div>
  );
};
