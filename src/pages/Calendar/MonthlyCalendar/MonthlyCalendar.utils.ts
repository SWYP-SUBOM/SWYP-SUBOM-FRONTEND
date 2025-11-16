import { isSameDay } from 'date-fns';
import type { CalendarDateStatus } from './MonthlyCalendar.types';
import { DATE_COLOR_MAP } from './MonthlyCalendar.constants';

export const getDateColor = (date: Date, datesWithStatus: CalendarDateStatus[]): string | null => {
  const dateStatus = datesWithStatus.find((d) => isSameDay(d.date, date));
  return dateStatus ? DATE_COLOR_MAP[dateStatus.color] : null;
};
