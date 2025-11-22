import { eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader';
import { useGetCalendar } from '../../hooks/Calendar/useGetCalendar';
import { MonthlyCalendar } from './MonthlyCalendar/MonthlyCalendar';
import type { CalendarDateStatus } from './MonthlyCalendar/MonthlyCalendar.types';
import { MonthlyTrainingStatusBox } from './MonthlyTrainingStatusBox/MonthlyTrainingStatusBox';
import { WeeklyChallengeBox } from './WeeklyChallengeBox/WeeklyChallengeBox';

export const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: calendarData } = useGetCalendar({ year, month });

  const getCategoryColor = (categoryName: string): CalendarDateStatus['color'] => {
    const colorMap: Record<string, CalendarDateStatus['color']> = {
      일상: 'blue',
      시대·사회: 'pink',
      인간관계: 'purple',
      가치관: 'yellow',
      문화·트렌드: 'green',
    };
    return colorMap[categoryName];
  };

  const datesWithStatus = useMemo(() => {
    if (!calendarData?.days) return [];

    return calendarData.days
      .filter((day) => day.hasWriting)
      .map((day) => ({
        date: new Date(day.date),
        color: getCategoryColor(day.category.categoryName),
        postId: day.postId,
      }));
  }, [calendarData, getCategoryColor]);

  const weeklyChallengeData = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const streakDatesSet = new Set(calendarData?.streakDates || []);
    const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

    const days = weekDays.slice(0, 7).map((day) => {
      const dayOfWeek = day.getDay();
      const dayLabel = dayLabels[dayOfWeek];
      const dateStr = format(day, 'yyyy-MM-dd');
      const hasWriting = streakDatesSet.has(dateStr);

      let status: 'pastCompleted' | 'todayCompleted' | 'incomplete';
      if (hasWriting) {
        status = isSameDay(day, today) ? 'todayCompleted' : 'pastCompleted';
      } else {
        status = 'incomplete';
      }

      return {
        dayLabel,
        status,
      };
    });

    return {
      title: '이번 주 챌린지',
      goal: '일주일에 5번 이상 글 쓰면 성공!',
      days,
    };
  }, [calendarData?.streakDates]);

  const handleDateClick = (date: Date) => {
    const clickedDate = datesWithStatus.find(
      (item) =>
        item.date.getDate() === date.getDate() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear(),
    );

    if (clickedDate?.postId) {
      navigate(`/postdetail/${clickedDate.postId}`);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="h-[218px] bg-b7 shrink-0">
          <TitleHeader title="나의 캘린더" />
        </div>
        <WeeklyChallengeBox {...weeklyChallengeData} />
        <div className="B01_B mt-[120px] px-4">이번달 글쓰기 훈련 상황</div>
        <MonthlyTrainingStatusBox
          totalWritingCount={calendarData?.summary.totalWritingCount ?? 0}
          totalWeeklyChallengeCount={calendarData?.summary.totalWeeklyChallengeCount ?? 0}
        />

        <MonthlyCalendar
          datesWithStatus={datesWithStatus}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onDateClick={handleDateClick}
        />
        <div style={{ minHeight: 'calc(110px + env(safe-area-inset-bottom))' }}></div>
      </div>
    </>
  );
};
