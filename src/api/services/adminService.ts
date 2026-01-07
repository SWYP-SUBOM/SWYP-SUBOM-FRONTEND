import { ADMIN_ENDPOINTS } from '../endpoints';
import { apiClient } from '../../utils/apiClient';

export interface AdminLoginRequest {
  email: string;
  password: string;
  totpCode: string;
}

export interface AdminLoginResponse {
  accessToken: string;
}

export type TopicMode = 'ALL' | 'APPROVED' | 'PENDING' | 'QUESTION' | 'LOGIC';

export interface GetTopicsRequest {
  mode?: TopicMode;
  categoryId?: number | 'ALL';
}

export interface Topic {
  categoryId: number;
  categoryName: string;
  topicId: number;
  topicName: string;
  topicType: string;
  topicStatus: 'PENDING' | 'APPROVED';
  usedAt: string | null;
}

export interface GetTopicsResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    totalCount: number;
    topics: Topic[];
  };
}

export const adminLogin = async (loginData: AdminLoginRequest): Promise<AdminLoginResponse> => {
  return apiClient.post<AdminLoginResponse>(ADMIN_ENDPOINTS.LOGIN, loginData);
};

export const getTopics = async (params?: GetTopicsRequest): Promise<GetTopicsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.mode) {
    queryParams.append('mode', params.mode);
  }
  if (params?.categoryId && params.categoryId !== 'ALL') {
    queryParams.append('categoryId', params.categoryId.toString());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${ADMIN_ENDPOINTS.TOPICS}?${queryString}` : ADMIN_ENDPOINTS.TOPICS;

  const response = await apiClient.get<GetTopicsResponse>(url);
  return response;
};

export interface CreateTopicRequest {
  topicName: string;
  topicType: 'QUESTION' | 'LOGIC';
}

export interface CreateTopicResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    categoryName: string;
    topicName: string;
    categoryId: number;
    topicId: number;
    topicType: string;
  };
}

export const createTopic = async (
  categoryId: number,
  topicData: CreateTopicRequest,
): Promise<CreateTopicResponse> => {
  const url = `${ADMIN_ENDPOINTS.TOPIC_GENERATION}/${categoryId}`;
  console.log('createTopic API 호출:', { url, categoryId, topicData });
  const response = await apiClient.post<CreateTopicResponse>(url, topicData);
  console.log('createTopic API 응답:', response);
  return response;
};

export interface StartTopicGenerationResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    generationId: number;
    status: 'PROCESSING' | 'COMPLETED' | 'COMPLETED_WITH_ERRORS' | 'FAILED';
    errorMessage: string | null;
  };
}

export const startTopicGeneration = async (): Promise<StartTopicGenerationResponse> => {
  return apiClient.post<StartTopicGenerationResponse>(ADMIN_ENDPOINTS.TOPIC_GENERATION, {});
};

export interface GetTopicGenerationStatusResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    generationId: number;
    status: 'PROCESSING' | 'COMPLETED' | 'COMPLETED_WITH_ERRORS' | 'FAILED';
    errorMessage: string | null;
  };
}

export const getTopicGenerationStatus = async (
  generationId: number,
): Promise<GetTopicGenerationStatusResponse> => {
  return apiClient.get<GetTopicGenerationStatusResponse>(
    `${ADMIN_ENDPOINTS.TOPIC_GENERATION}/${generationId}`,
  );
};

export interface UpdateTopicReservationRequest {
  usedAt?: string;
}

export interface UpdateTopicReservationResponse {
  success: boolean;
  code: string;
  message: string;
}

export const updateTopicReservation = async (
  topicId: number,
  usedAt?: string,
): Promise<UpdateTopicReservationResponse> => {
  const url = `${ADMIN_ENDPOINTS.TOPIC_RESERVATION}/${topicId}/reservation`;

  const queryParams = new URLSearchParams();
  if (usedAt) {
    queryParams.append('usedAt', usedAt);
  }

  const queryString = queryParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  console.log('updateTopicReservation API 호출:', { url: fullUrl, topicId, usedAt });
  const response = await apiClient.patch<UpdateTopicReservationResponse>(fullUrl, {});
  console.log('updateTopicReservation API 응답:', response);
  return response;
};

export interface UpdateTopicRequest {
  topicName?: string;
  topicType?: 'QUESTION' | 'LOGIC';
  categoryId?: number;
}

export interface UpdateTopicResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    categoryName: string;
    topicName: string;
    categoryId: number;
    topicId: number;
    topicType: string;
  };
}

export const updateTopic = async (
  topicId: number,
  updateData: UpdateTopicRequest,
): Promise<UpdateTopicResponse> => {
  const url = `${ADMIN_ENDPOINTS.TOPIC_RESERVATION}/${topicId}`;
  console.log('updateTopic API 호출:', { url, topicId, updateData });
  const response = await apiClient.patch<UpdateTopicResponse>(url, updateData);
  console.log('updateTopic API 응답:', response);
  return response;
};

/**
 * 토픽 삭제
 * DELETE /api/admin/topic/{topicId}
 */
export interface DeleteTopicResponse {
  success: boolean;
  code: string;
  message: string;
}

export const deleteTopic = async (topicId: number): Promise<DeleteTopicResponse> => {
  const url = `${ADMIN_ENDPOINTS.TOPIC_RESERVATION}/${topicId}`;
  console.log('deleteTopic API 호출:', { url, topicId });
  const response = await apiClient.remove<DeleteTopicResponse>(url);
  console.log('deleteTopic API 응답:', response);
  return response;
};

export const adminService = {
  adminLogin,
  getTopics,
  createTopic,
  startTopicGeneration,
  getTopicGenerationStatus,
  updateTopicReservation,
  updateTopic,
  deleteTopic,
};
