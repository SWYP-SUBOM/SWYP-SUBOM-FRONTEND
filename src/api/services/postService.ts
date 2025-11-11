import { apiClient } from '../../utils/apiClient';
import { POST_ENDPOINTS } from '../endpoints';
import type { PostResponse, saveAndUpdatePostResponse, savePostResponse } from '../types/post';

export const getPost = async (postId: number, context?: string): Promise<PostResponse['data']> => {
  const url = context
    ? `${POST_ENDPOINTS.GET_POST}/${postId}?context=${encodeURIComponent(context)}`
    : `${POST_ENDPOINTS.GET_POST}/${postId}`;

  const response = await apiClient.get<PostResponse>(url);
  if (!response.data) {
    throw new Error('게시글을 조회할 수 없습니다');
  }
  return response.data;
};

export const savePost = async (
  categoryId: number,
  topicId: number,
  content: string,
): Promise<savePostResponse['data']> => {
  const response = await apiClient.post<savePostResponse>(`${POST_ENDPOINTS.GET_POST}`, {
    categoryId,
    topicId,
    content,
  });

  return response.data;
};

export const updateAndSavePost = async (
  postId: number,
  status: string,
  content: string,
): Promise<saveAndUpdatePostResponse['data']> => {
  const response = await apiClient.put<saveAndUpdatePostResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}`,
    {
      status,
      content,
    },
  );
  return response.data;
};

export const postService = {
  getPost,
  savePost,
  updateAndSavePost,
};
