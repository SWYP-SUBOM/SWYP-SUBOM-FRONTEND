import { WeeklyChallengeBox } from './WeeklyChallengeBox/WeeklyChallengeBox';
import { MonthlyTrainingStatusBox } from './MonthlyTrainingStatusBox/MonthlyTrainingStatusBox';
import { MonthlyCalendar } from './MonthlyCalendar/MonthlyCalendar';
import { TitleHeader } from '../../components/common/TitleHeader';

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

  // 예시 데이터 (API 연동 시 제거)
  const exampleDates = [
    { date: new Date(2025, 11, 1), color: 'red' as const },
    { date: new Date(2025, 11, 2), color: 'red' as const },
    { date: new Date(2025, 11, 3), color: 'blue' as const },
    { date: new Date(2025, 11, 4), color: 'purple' as const },
    { date: new Date(2025, 11, 6), color: 'purple' as const },
    { date: new Date(2025, 11, 9), color: 'yellow' as const },
    { date: new Date(2025, 11, 10), color: 'green' as const },
    { date: new Date(2025, 11, 11), color: 'blue' as const },
  ];

  return (
    <>
      <div className="flex flex-col h-full ">
        <div className="  h-[218px] bg-b7  pt-10 ">
          <TitleHeader title="캘린더" />
        </div>

        <WeeklyChallengeBox {...weeklyChallengeData} />
        <div className=" B01_B mt-[108px]  px-4">이번달 글쓰기 훈련 상황</div>
        <MonthlyTrainingStatusBox />
        <MonthlyCalendar datesWithStatus={exampleDates} />
      </div>
    </>
  );
};

export default Calendar;
