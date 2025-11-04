import { WeeklyChallengeBox } from './WeeklyChallengeBox/WeeklyChallengeBox';
import { MonthlyTrainingStatusBox } from './MonthlyTrainingStatusBox/MonthlyTrainingStatusBox';
import alarm from '../../assets/Header/alarm.svg';

const Calendar = () => {
  const weeklyChallengeData = {
    title: '이번 주 챌린지',
    goal: '일주일에 5번 이상 글 쓰면 성공!',
    days: [
      { dayLabel: '일', status: 'completed-inactive' as const },
      { dayLabel: '월', status: 'completed-inactive' as const },
      { dayLabel: '화', status: 'completed-active' as const },
      { dayLabel: '수', status: 'completed-active' as const },
      { dayLabel: '목', status: 'completed-active' as const },
      { dayLabel: '금', status: 'incomplete' as const },
      { dayLabel: '토', status: 'incomplete' as const },
    ],
  };

  return (
    <>
      <div className="flex flex-col h-full  ">
        <div className="  h-[218px] bg-b7 "></div>

        <WeeklyChallengeBox {...weeklyChallengeData} />
        <div className=" B01_B mt-[108px]  px-4">이번달 글쓰기 훈련 상황</div>
        <MonthlyTrainingStatusBox />
      </div>
    </>
  );
};

export default Calendar;
