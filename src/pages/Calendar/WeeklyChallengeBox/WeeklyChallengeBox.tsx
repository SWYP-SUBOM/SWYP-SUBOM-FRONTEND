import type { WeeklyChallengeProps } from './WeeklyChallenge.types';
import type { ChallengeDayStatus } from './WeeklyChallenge.types';

import pastCompletedIcon from '../../../assets/Calendar/past-completed.svg';
import todayCompletedIcon from '../../../assets/Calendar/today-completed.svg';
import incompleteIcon from '../../../assets/Calendar/incomplete.svg';

interface ProgressCircleProps {
  status: ChallengeDayStatus;
}

const ProgressCircle = ({ status }: ProgressCircleProps) => {
  const getIcon = () => {
    switch (status) {
      case 'pastCompleted':
        return pastCompletedIcon;
      case 'todayCompleted':
        return todayCompletedIcon;
      default:
        return incompleteIcon;
    }
  };

  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <img src={getIcon()} alt={status} className="w-10 h-10" />
    </div>
  );
};

export const WeeklyChallengeBox = ({ title, goal, days }: WeeklyChallengeProps) => {
  return (
    <div className="left-4 right-4 h-[168px] absolute top-33 rounded-xl pt-5 pb-5 z-2 border border-[#E7EBEE] shadow-[0_0_30px_0_#D0D2D9] bg-[#F9F9F9]">
      {/* 헤더 섹션 - 연한 파란색 배경 */}
      <div className="px-4.5">
        <h2 className="B02_B text-gray-900 text-left mb-3">{title}</h2>
        <p className="B03_M text-b7">{goal}</p>
      </div>

      {/* 일일 진행 상황 추적 섹션 */}
      <div className="px-2.5 bg-white mt-[13px] mx-2">
        {/* 요일 레이블 */}
        <div className="flex ">
          {days.slice(0, 7).map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <span className="B03_1_M text-gray-500">{day.dayLabel}</span>

              <ProgressCircle status={day.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
