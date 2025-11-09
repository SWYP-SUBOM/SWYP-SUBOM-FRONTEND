import { apiClient } from '../../utils/apiClient';
import { USER_ENDPOINTS } from '../endpoints';
import type { namingResponse } from '../types/user';

export const getUserName = async (): Promise<string> => {
  const response = await apiClient.get<namingResponse>(USER_ENDPOINTS.GET_NAMING);
  if (!response.data) {
    throw new Error('사용자 이름을 찾을 수 없습니다.');
  }
  return response.data;
};

export const postUserName = async (name: string): Promise<void> => {
  await apiClient.post<namingResponse>(
    `${USER_ENDPOINTS.NAMING}?name=${encodeURIComponent(name)}`,
    {},
  );
};

export const userService = {
  getUserName,
  postUserName,
};
