import { apiClient } from '../../utils/apiClient';
import { POST_ENDPOINTS } from '../endpoints';
import type { getAIfeedBackResponse, postAIfeedBackResponse } from '../types/feedBack';

export const postAIfeedBack = async (postId: number): Promise<postAIfeedBackResponse['data']> => {
  const response = await apiClient.post<postAIfeedBackResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}/ai-feedback`,
  );

  return response.data;
};

export const getAIfeedBack = async (
  postId: number,
  aiFeedbackId: number,
): Promise<getAIfeedBackResponse['data']> => {
  const response = await apiClient.get<getAIfeedBackResponse>(
    `${POST_ENDPOINTS.GET_POST}/${postId}/ai-feedback/${aiFeedbackId}`,
  );

  return response.data;
};

export const feedBackService = {
  postAIfeedBack,
  getAIfeedBack,
};
