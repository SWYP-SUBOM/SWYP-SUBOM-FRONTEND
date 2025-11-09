import { apiClient } from '../../utils/apiClient';
import { CATEGORY_ENDPOINTS } from '../endpoints';
import type { TopicsResponse } from '../types/feed';

export const getTopics = async (
  categoryId: number,
  sort: string,
): Promise<TopicsResponse['data']> => {
  const response = await apiClient.get<TopicsResponse>(
    `${CATEGORY_ENDPOINTS.GET_CATEGORY}/${categoryId}/questions?${sort}`,
  );
  if (!response.data) {
    throw new Error('주제 모아보기를 조회할 수 없습니다');
  }
  return response.data;
};

export const feedService = {
  getTopics,
};
