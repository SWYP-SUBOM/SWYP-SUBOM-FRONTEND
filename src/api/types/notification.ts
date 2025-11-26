import type { CategoryNameType } from '../../constants/Category';
import type { ReactionType } from '../../constants/Reations';

export interface NotificationResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    notifications: {
      notificationId: number;
      reactionName: ReactionType;
      reactionCount: number;
      updatedAt: string;
      category: {
        categoryId: number;
        categoryName: CategoryNameType;
      };
      postId: number;
      read: boolean;
    }[];
    cursor: string;
    hasMore: boolean;
  };
}

export interface NotificationStreamEvent {
  event: 'snapshot' | 'notification';
  data: {
    unreadCount?: number;
    notification?: {
      notificationId: number;
      reactionName: ReactionType;
      reactionCount: number;
      updatedAt: string;
      category: {
        categoryId: number;
        categoryName: CategoryNameType;
      };
      postId: number;
      read: boolean;
    };
  };
}
