import { useState } from 'react';
import { useOnboardingNavigation } from '../../../hooks/useOnboardingNavigation';

export const NameInput = () => {
  const [name, setName] = useState('');
  const maxLength = 10;
  const { handleNext } = useOnboardingNavigation();

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
      <div className="flex flex-col items-center px-10 mt-[44px] relative">
        <div className="w-full h-14 relative bg-gray-100 rounded-lg">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="여기에 이름 입력하기"
            maxLength={maxLength}
            className="w-full h-14 bg-gray-100 rounded-lg border-0 border-b-2 border-blue-400 text-gray-900 B01_B focus:outline-none focus:border-blue-600 px-4"
          />
          <div className="absolute right-4 bottom-3 B03_1_M text-neutral-400">
            {name.length}/{maxLength}
          </div>
        </div>
      </div>
      <div className="absolute top-[520px] sm:top-[654px] left-0 right-0 flex flex-col justify-center items-center px-4 z-5">
        <button
          onClick={handleNext}
          className="w-full h-14 bg-b7 rounded-xl text-white B02_B cursor-pointer active:bg-b8 active:scale-95  hover:bg-b8  transition-colors duration-300 "
        >
          시작하기
        </button>
      </div>
    </div>
  );
};
