export interface TopicsResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    categories: {
      categoryId: number;
      categoryName: string;
    };
    selectedCategoryName: string;
    topics: {
      topicId: number;
      topicName: string;
      usedAt: string;
    }[];
  };
}

export interface FeedResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    topicName: string;
    categoryName: string;
    postList: {
      postId: number;
      nickname: string;
      summary: string;
      updatedAt: string;
      totalReactions: number;
      postViews: number;
      isMe?: boolean;
    }[];
    curUpdatedAt: string;
    curPostId: number;
    hasMore: boolean;
  };
}
