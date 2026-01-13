import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
import type { MonthlyCalendarProps } from './MonthlyCalendar.types';
import { getDateColor } from './MonthlyCalendar.utils';
import { WEEKDAYS } from './MonthlyCalendar.constants';
import { NavigationButtons } from './NavigationButtons';

import { GAEvents } from '../../../utils/GAEvent';

export const MonthlyCalendar = ({
  datesWithStatus = [],
  currentDate: externalCurrentDate,
  onDateChange: externalOnDateChange,
  onDateClick,
}: MonthlyCalendarProps) => {
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(new Date());
  const currentDate = externalCurrentDate ?? internalCurrentDate;
  const setCurrentDate = externalOnDateChange ?? setInternalCurrentDate;

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentDate(newDate);
  };

  const handleDateChange = (value: unknown) => {
    if (value instanceof Date) {
      // 날짜 클릭 시 onDateClick 호출
      const clickedDate = datesWithStatus.find(
        (item) =>
          item.date.getDate() === value.getDate() &&
          item.date.getMonth() === value.getMonth() &&
          item.date.getFullYear() === value.getFullYear(),
      );

      if (clickedDate?.postId && onDateClick) {
        onDateClick(value);
      } else {
        setCurrentDate(value);
      }
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      const clickedDate = datesWithStatus.find(
        (item) =>
          item.date.getDate() === value[0].getDate() &&
          item.date.getMonth() === value[0].getMonth() &&
          item.date.getFullYear() === value[0].getFullYear(),
      );

      if (clickedDate?.postId && onDateClick) {
        onDateClick(value[0]);
      } else {
        setCurrentDate(value[0]);
      }
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate instanceof Date) {
      setCurrentDate(activeStartDate);
    }
  };

  return (
    <div className="px-4 mt-4 ">
      <div className="rounded-2xl shadow-sm  p-4">
        <div className="flex items-center justify-between pr-1 mb-4">
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
          locale="en-US"
          formatDay={(_locale, date) => format(date, 'd')}
          formatShortWeekday={(_locale, date) => {
            const dayIndex = date.getDay();
            return WEEKDAYS[dayIndex];
          }}
          tileContent={({ date, view }) => {
            const color = getDateColor(date, datesWithStatus);
            const isCurrentMonth = isSameMonth(date, currentDate);

            if (view === 'month' && color && isCurrentMonth) {
              return (
                <div className="absolute inset-0 flex justify-center items-center ">
                  <div
                    className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}
                    onClick={() => {
                      GAEvents.calendarDateClick(format(date, 'yyyy-MM-dd'));
                    }}
                  >
                    <span className="text-white B03_B">{format(date, 'd')}</span>
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
            if (!isCurrentMonth) return 'B03_B text-gray-500';
            // 모든 요일을 검은색으로 표시
            if (isCurrentMonth && !color) {
              return 'B03_B text-gray-800';
            }
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
