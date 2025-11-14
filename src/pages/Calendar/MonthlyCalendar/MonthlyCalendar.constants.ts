export const DATE_COLOR_MAP = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-400',
  yellow: 'bg-yellow-400',
  green: 'bg-green-400',
} as const;

// react-calendar는 ISO 8601 표준으로 월요일부터 시작
export const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
