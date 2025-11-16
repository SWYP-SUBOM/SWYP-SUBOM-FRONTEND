export interface CalendarRequest {
  year: number;
  month: number;
}

export interface CalendarResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    currentDate: string;
    summary: {
      totalWritingCount: number;
      totalWeeklyChallengeCount: number;
    };
    days: {
      date: string;
      dayOfWeek: string;
      hasWriting: boolean;
      postId: number;
      category: {
        categoryId: number;
        categoryName: string;
      };
    }[];
    streakDates: string[];
  } | null;
}
