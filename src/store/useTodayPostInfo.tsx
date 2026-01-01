import { create } from 'zustand';
import type { HomeBannerStatus } from '../pages/Home/HomeBanner/HomeBanner.types';

interface TodayPost {
  postId?: number | null;
  postStatus?: HomeBannerStatus;
  categoryId?: number | null;
  categoryName?: string | null;
  topicId?: number | null;
  topicName?: string | null;
  aiFeedbackId?: number | null;
  topicType?: string | null;
}

interface TodayPostInfoState {
  todayPost: TodayPost;
  setTodayPostInfo: (todayPost: TodayPost) => void;
}

export const useTodayPostInfoStore = create<TodayPostInfoState>((set) => ({
  todayPost: {},
  setTodayPostInfo: (todayPost) => set({ todayPost: todayPost }),
}));
