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
