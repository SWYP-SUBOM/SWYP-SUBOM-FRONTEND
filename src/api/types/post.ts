import type { ReactionNameType } from '../../hooks/Post/useToggleReaction';

export interface PostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    reactions: {
      reactionId: number;
      reactionName: string;
      reactionCount: number;
    }[];
    viewCount: number;
    myReaction: {
      reactionId: number;
      reactionName: string;
    } | null;
    content: string;
    updatedAt: string;
    writer: {
      name: string;
      me: boolean;
    };
  };
}

export interface PostWithEditResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    topicId: number;
    nickname: string;
    topicInfo: {
      topicName: string;
      categoryName: string;
    };
    content: string;
    status: string;
    updatedAt: string;
    aiFeedbackInfo: string | null;
    revised: boolean;
  };
}

export interface savePostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    nickname: string;
  };
}

export interface saveAndUpdatePostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    status: string;
    updatedAt: string;
    content: string;
  };
}

export interface deletePostResponse {
  success: boolean;
  code: string;
  message: string;
}

export interface PostReactionResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    metrics: {
      totalReactions: number;
      countsByType: Record<ReactionNameType, number>;
    };
    currentUserReaction: string | null;
  };
}

export interface MyWritingsRequest {
  cursorId?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

export interface MyWritingsResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    items: {
      postId: number;
      topicInfo: {
        topicName: string;
        categoryName: string;
      };
      summary: string;
      status: string;
      isRevised: boolean;
      updatedAt: string;
    }[];
    pageInfo: {
      currentPage: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
      isLast: boolean;
    };
  } | null;
}

export interface MyReactionsRequest {
  cursorId?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

export interface MyReactionsResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    items: {
      postId: number;
      topicInfo: {
        topicName: string;
        categoryName: string;
      };
      summary: string;
      reactionInfo: {
        currentUserReaction: string;
        metrics: {
          totalReactions: number;
          countsByType: Record<string, number>;
        };
      };
      status: string;
      updatedAt: string;
    }[];
    sliceInfo: {
      hasNext: boolean;
      nextCursorId: number;
    };
  } | null;
}

export interface PopularPostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    postId: number;
    nickname: string;
    summary: string;
    updatedAt: string;
    totalReactions: number;
    postViews: number;
    category: {
      categoryId: number;
      categoryName: string;
    };
  };
}
