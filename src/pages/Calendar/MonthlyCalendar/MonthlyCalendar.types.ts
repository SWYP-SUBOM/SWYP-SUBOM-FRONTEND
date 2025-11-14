export type CalendarDateStatus = {
  date: Date;
  color: 'red' | 'blue' | 'purple' | 'yellow' | 'green';
};

export type MonthlyCalendarProps = {
  datesWithStatus?: CalendarDateStatus[];
};
