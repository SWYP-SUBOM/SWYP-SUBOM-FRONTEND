import pen from '../../../assets/Calendar/pen.svg';

export const MonthlyTrainingStatusBox = () => {
  return (
    <div className="flex justify-center items-center mt-3.5 px-4">
      <div className="w-full bg-white rounded-2xl shadow-sm flex divide-x divide-gray-200">
        {/* 왼쪽 섹션: 글쓰기 완료 */}
        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <img src={pen} alt="pen" className="w-10 h-10 opacity-60" />
            <div className="flex flex-col gap-1">
              <span className="B02_B text-blue-600">8회</span>
              <span className="B02_B text-gray-900">글쓰기 완료</span>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 챌린지 달성 */}
        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#F7B801" />
                  </linearGradient>
                </defs>
                {/* 불꽃 외곽 */}
                <path
                  d="M20 6C20 6 12 10 12 18C12 20 13 22 14 24C13 26 12 28 12 30C12 35 16 38 20 38C24 38 28 35 28 30C28 28 27 26 26 24C27 22 28 20 28 18C28 10 20 6 20 6Z"
                  fill="url(#flameGradient)"
                />
                {/* 하트 모양 */}
                <path
                  d="M20 25C18 23 16 21 16 19C16 17.5 17.2 16.5 18.5 16.5C19.2 16.5 19.8 16.8 20 17.5C20.2 16.8 20.8 16.5 21.5 16.5C22.8 16.5 24 17.5 24 19C24 21 22 23 20 25Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="B02_B text-blue-600">1회</span>
              <span className="B02_B text-gray-900">챌린지 달성</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
