import { apiClient } from '../../utils/apiClient';
import { CATEGORY_ENDPOINTS, POST_ENDPOINTS } from '../endpoints';
import type { FeedResponse, TopicsResponse } from '../types/feed';

export const getTopics = async (
  categoryId: number,
  sort: string,
): Promise<TopicsResponse['data']> => {
  const response = await apiClient.get<TopicsResponse>(
    `${CATEGORY_ENDPOINTS.GET_CATEGORY}/${categoryId}/questions?sort=${encodeURIComponent(sort)}`,
  );
  if (!response.data) {
    throw new Error('주제 모아보기를 조회할 수 없습니다');
  }
  return response.data;
};

export const getFeed = async (
  categoryId: number,
  curUpdatedAt?: string,
  curPostId?: number,
  topicId?: number,
): Promise<FeedResponse['data']> => {
  let url = `${POST_ENDPOINTS.GET_POST}?categoryId=${categoryId}`;

  if (curUpdatedAt && curPostId) {
    url += `&curUpdatedAt=${curUpdatedAt}&curPostId=${curPostId}`;
  }

  if (topicId) {
    url += `&topicId=${topicId}`;
  }

  const response = await apiClient.get<FeedResponse>(url);
  if (!response.data) {
    throw new Error('피드를 조회할 수 없습니다');
  }
  return response.data;
};

export const feedService = {
  getTopics,
  getFeed,
};
