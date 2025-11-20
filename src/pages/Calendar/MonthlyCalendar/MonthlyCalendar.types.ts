export type CalendarDateStatus = {
  date: Date;
  color: 'blue' | 'pink' | 'purple' | 'yellow' | 'green';
  postId?: number;
};

export type MonthlyCalendarProps = {
  datesWithStatus?: CalendarDateStatus[];
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
  onDateClick?: (date: Date) => void;
};
