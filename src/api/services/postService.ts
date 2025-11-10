import { apiClient } from '../../utils/apiClient';
import { POST_ENDPOINTS } from '../endpoints';
import type { PostResponse } from '../types/post';

export const getPost = async (postId: number, context?: string): Promise<PostResponse['data']> => {
  const url = context
    ? `${POST_ENDPOINTS.GET_CATEGORY}/${postId}?context=${encodeURIComponent(context)}`
    : `${POST_ENDPOINTS.GET_CATEGORY}/${postId}`;

  const response = await apiClient.get<PostResponse>(url);
  if (!response.data) {
    throw new Error('게시글을 조회할 수 없습니다');
  }
  return response.data;
};

export const postService = {
  getPost,
};
