import { create } from 'zustand';

interface TodayPost {
  postId?: number | null;
  postStatus?: string;
  categoryId?: number | null;
  categoryName?: string | null;
  topicId?: number | null;
  topicName?: string | null;
  aiFeedbackId?: number | null;
}

interface TodayPostInfoState {
  todayPost: TodayPost;
  setTodayPostInfo: (todayPost: TodayPost) => void;
}

export const useTodayPostInfoStore = create<TodayPostInfoState>((set) => ({
  todayPost: {},
  setTodayPostInfo: (todayPost) => set({ todayPost: todayPost }),
}));
