export type ChallengeDayStatus = 'pastCompleted' | 'todayCompleted' | 'incomplete';

export interface WeeklyChallengeDay {
  dayLabel: string;
  status: ChallengeDayStatus;
}

export interface WeeklyChallengeProps {
  title: string;
  goal: string;
  days: WeeklyChallengeDay[];
}
