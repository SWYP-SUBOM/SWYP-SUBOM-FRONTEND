export interface PostResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    content: string;
    updatedAt: string;
    writer: {
      name: string;
      isMe: boolean;
    };
    myReaction: {
      reactionId: number;
      reactionName: string;
    } | null;
    reactions: {
      reactionId: number;
      reactionName: string;
      reactionCount: number;
    }[];
    viewCount: number;
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
      countsByType: Record<string, number>;
    };
    currentUserReaction: string;
  };
}
