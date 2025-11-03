export const NameInput = () => {
  return (
    <div className="app-root flex flex-col  pt-[168px]  style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))'}}">
      <div className="flex flex-col justify-center items-center text-center  ">
        <div className="T02_B text-gray-900 ">당신의 이름을 입력해주세요</div>

        <div className="B03_1_M text-neutral-600 mt-[27px]">별명과 실명 모두 괜찮아요</div>
        <div className="B03_1_M text-neutral-600 ">
          (단, <span className="text-blue-600 B03_B">숫자·특수문자</span> 포함이{' '}
          <span className="text-blue-600 B03_B">불가능</span>해요)
        </div>
      </div>
      <div className="flex flex-col items-center px-10 mt-[44px]">
        <input
          type="text"
          placeholder="여기에 이름 입력하기"
          className="w-full h-14 bg-gray-100 rounded-xl text-gray-900 B01_B cursor-pointer active:bg-gray-200 active:scale-95  hover:bg-gray-200  transition-colors duration-300 "
        />
      </div>
      <div className="absolute left-0 right-0 flex flex-col justify-center items-center px-4 bottom-10 z-5">
        <button className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 ">
          시작하기
        </button>
      </div>
    </div>
  );
};
