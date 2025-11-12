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
    };
  } | null;
}

export interface dailyQuestionResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    categoryName: string;
    topicName: string;
  };
}
