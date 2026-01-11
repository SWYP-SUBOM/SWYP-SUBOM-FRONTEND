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
  const completedDays = days.filter(
    (day) => day.status === 'pastCompleted' || day.status === 'todayCompleted',
  ).length;
  const isChallengeCompleted = completedDays >= 5;

  return (
    <div
      className={`left-4 right-4 h-[168px] absolute top-18 rounded-xl pt-5 pb-5 z-2 border border-[#E7EBEE] shadow-[0_0_30px_0_#D0D2D9] ${
        isChallengeCompleted ? 'bg-b1' : 'bg-white'
      }`}
    >
      <div className="px-4.5">
        <h2 className="B02_B text-gray-900 text-left mb-3">{title}</h2>
        <p className="B03_M text-b7">
          {isChallengeCompleted ? '연속 5회 작성, 이번 주 챌린지를 달성했어요!' : goal}
        </p>
      </div>

      <div className="px-2.5 bg-white mt-[13px] mx-2">
        <div className="flex ">
          {days.slice(0, 7).map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <span
                className={`B03_B ${day.status === 'todayCompleted' ? 'text-b7' : 'text-gray-600'}`}
              >
                {day.dayLabel}
              </span>

              <ProgressCircle status={day.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
