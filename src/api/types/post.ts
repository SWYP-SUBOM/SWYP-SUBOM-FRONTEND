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
    };
    reactions: {
      reactionId: number;
      reactionName: string;
      reactionCount: number;
    }[];
    viewCount: number;
  };
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
