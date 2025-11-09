import { apiClient } from '../../utils/apiClient';
import { HOME_ENDPOINTS } from '../endpoints';
import type { homeResponse } from '../types/home';

export const getHomeData = async (): Promise<homeResponse['data']> => {
  const response = await apiClient.get<homeResponse>(HOME_ENDPOINTS.HOME);
  if (!response.data) {
    throw new Error('홈화면을 조회할 수 없습니다');
  }
  return response.data;
};

export const homeService = {
  getHomeData,
};
