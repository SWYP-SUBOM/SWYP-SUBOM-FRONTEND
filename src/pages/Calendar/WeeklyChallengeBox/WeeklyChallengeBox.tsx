import type { WeeklyChallengeProps } from './WeeklyChallenge.types';

interface ProgressCircleProps {
  status: 'completed-active' | 'completed-inactive' | 'incomplete';
}

const ProgressCircle = ({ status }: ProgressCircleProps) => {
  const getCircleClass = () => {
    switch (status) {
      case 'completed-active':
        return 'w-10 h-10 bg-b7 rounded-full flex items-center justify-center shadow-lg';
      case 'completed-inactive':
        return 'w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center';
      case 'incomplete':
        return 'w-10 h-10 bg-gray-200 rounded-full';
      default:
        return 'w-10 h-10 bg-gray-200 rounded-full';
    }
  };

  const getCheckmark = () => {
    if (status === 'completed-active') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 10L8.5 12.5L14 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (status === 'completed-inactive') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 8L6.5 10.5L12 5"
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return null;
  };

  return <div className={getCircleClass()}>{getCheckmark()}</div>;
};

export const WeeklyChallengeBox = ({ title, goal, days }: WeeklyChallengeProps) => {
  return (
    <div className="h-[168px] absolute top-35 left-4 rounded-xl pt-5 pb-5 z-2 border border-[#E7EBEE] shadow-[0_0_30px_0_#D0D2D9] bg-[#F9F9F9]">
      {/* 헤더 섹션 - 연한 파란색 배경 */}
      <div className="  px-4.5 ">
        <h2 className="B02_B text-gray-900 text-left mb-3">{title}</h2>
        <p className="B03_M text-b7">{goal}</p>
      </div>

      {/* 일일 진행 상황 추적 섹션 */}
      <div className="px-2.5 bg-white mt-[13px]">
        {/* 요일 레이블 */}
        <div className="flex  ">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center px-0.5">
              <span className="B03_1_M text-gray-500">{day.dayLabel}</span>
              <ProgressCircle status={day.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
