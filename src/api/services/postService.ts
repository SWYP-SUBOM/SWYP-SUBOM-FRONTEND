import { apiClient } from '../../utils/apiClient';
import { POST_ENDPOINTS } from '../endpoints';
import type { PostReactionResponse, PostResponse } from '../types/post';

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

export const putPostReaction = async (
  postId: number,
  reactionTypeName: string,
): Promise<PostReactionResponse['data']> => {
  const response = await apiClient.put<PostReactionResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}/reaction`,
    {
      reactionTypeName: reactionTypeName,
    },
  );

  return response.data;
};

export const deletePostReaction = async (postId: number): Promise<PostReactionResponse['data']> => {
  const response = await apiClient.remove<PostReactionResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}/reaction`,
  );

  return response.data;
};

export const postService = {
  getPost,
  putPostReaction,
  deletePostReaction,
};
