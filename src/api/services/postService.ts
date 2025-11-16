import { apiClient } from '../../utils/apiClient';
import { POST_ENDPOINTS } from '../endpoints';
import type {
  deletePostResponse,
  MyReactionsRequest,
  MyReactionsResponse,
  MyWritingsRequest,
  MyWritingsResponse,
  PostReactionResponse,
  PostResponse,
  PostWithEditResponse,
  saveAndUpdatePostResponse,
  savePostResponse,
} from '../types/post';

export function getPost(postId: number): Promise<PostResponse['data']>;
export function getPost(postId: number, context: string): Promise<PostWithEditResponse['data']>;
export async function getPost(
  postId: number,
  context?: string,
): Promise<PostResponse['data'] | PostWithEditResponse['data']> {
  const url = context
    ? `${POST_ENDPOINTS.GET_POST}/${postId}?context=${encodeURIComponent(context)}`
    : `${POST_ENDPOINTS.GET_POST}/${postId}`;

  const response = await apiClient.get<PostResponse | PostWithEditResponse>(url);
  if (!response.data) {
    throw new Error('게시글을 조회할 수 없습니다');
  }
  return response.data;
}

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

export const deletePost = async (postId: number): Promise<deletePostResponse> => {
  const response = await apiClient.remove<deletePostResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}`,
    {
      postId,
    },
  );

  return response;
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

export const getMyWritings = async (
  params: MyWritingsRequest = {},
): Promise<MyWritingsResponse['data']> => {
  const queryParams = new URLSearchParams();
  if (params.cursorId !== undefined) queryParams.append('cursorId', params.cursorId.toString());
  if (params.size !== undefined) queryParams.append('size', params.size.toString());
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  if (params.sort) queryParams.append('sort', params.sort);

  const url = `${POST_ENDPOINTS.MY_WRITINGS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await apiClient.get<MyWritingsResponse>(url);
  if (!response.data) {
    throw new Error('내가 쓴 글을 조회할 수 없습니다.');
  }
  return response.data;
};

export const getMyReactions = async (
  params: MyReactionsRequest = {},
): Promise<MyReactionsResponse['data']> => {
  const queryParams = new URLSearchParams();
  if (params.cursorId !== undefined) queryParams.append('cursorId', params.cursorId.toString());
  if (params.size !== undefined) queryParams.append('size', params.size.toString());
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  if (params.sort) queryParams.append('sort', params.sort);

  const url = `${POST_ENDPOINTS.MY_REACTIONS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await apiClient.get<MyReactionsResponse>(url);
  if (!response.data) {
    throw new Error('내가 반응한 글을 조회할 수 없습니다.');
  }
  return response.data;
};

export const postService = {
  getPost,
  putPostReaction,
  deletePostReaction,
  savePost,
  updateAndSavePost,
  deletePost,
  getMyWritings,
  getMyReactions,
};
