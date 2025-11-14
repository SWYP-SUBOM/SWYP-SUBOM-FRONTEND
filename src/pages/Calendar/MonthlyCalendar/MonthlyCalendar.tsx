import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
import type { MonthlyCalendarProps } from './MonthlyCalendar.types';
import { getDateColor } from './MonthlyCalendar.utils';
import { WEEKDAYS } from './MonthlyCalendar.constants';
import { NavigationButtons } from './NavigationButtons';

export const MonthlyCalendar = ({ datesWithStatus = [] }: MonthlyCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentDate(newDate);
  };

  const handleDateChange = (value: unknown) => {
    if (value instanceof Date) {
      setCurrentDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setCurrentDate(value[0]);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate instanceof Date) {
      setCurrentDate(activeStartDate);
    }
  };

  return (
    <div className="px-4 mt-4 h-[310px]">
      <div className="rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="B01_B text-gray-900">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </h2>
          <NavigationButtons
            onPrev={() => navigateMonth('prev')}
            onNext={() => navigateMonth('next')}
          />
        </div>

        <Calendar
          value={currentDate}
          onChange={handleDateChange}
          activeStartDate={currentDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          formatDay={(_locale, date) => format(date, 'd')}
          formatShortWeekday={(_locale, date) => {
            // react-calendar는 월요일부터 시작하므로 인덱스 조정
            // date.getDay(): 0=일요일, 1=월요일, ..., 6=토요일
            // WEEKDAYS 배열: 0=월요일, 1=화요일, ..., 6=일요일
            const dayIndex = date.getDay();
            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            return WEEKDAYS[adjustedIndex];
          }}
          tileContent={({ date, view }) => {
            const color = getDateColor(date, datesWithStatus);
            const isCurrentMonth = isSameMonth(date, currentDate);

            if (view === 'month' && color && isCurrentMonth) {
              return (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{format(date, 'd')}</span>
                  </div>
                </div>
              );
            }
            return null;
          }}
          tileClassName={({ date, view }) => {
            if (view !== 'month') return null;

            const isCurrentMonth = isSameMonth(date, currentDate);
            const color = getDateColor(date, datesWithStatus);

            if (color && isCurrentMonth) return 'relative [&>abbr]:opacity-0';
            if (!isCurrentMonth) return 'text-gray-300';
            return null;
          }}
          className="border-none! w-full!"
          navigationLabel={() => ''}
          showNeighboringMonth={true}
        />
      </div>
    </div>
  );
};
