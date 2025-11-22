import type { HomeBannerStatus } from '../../pages/Home/HomeBanner/HomeBanner.types';

export interface homeResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    streak: {
      current: number;
    };
    categories: {
      categoryId: number;
      categoryName: string;
    }[];
    todayPost: {
      postId: number | null;
      postStatus: HomeBannerStatus;
      categoryId: number | null;
      categoryName: string | null;
      topicId: number | null;
      topicName: string | null;
      aiFeedbackId: number | null;
    } | null;
  };
}

export interface dailyQuestionResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    categoryName: string;
    topicName: string;
    topicId: number;
    categoryId: number;
    topicType: string;
  };
}
