import { apiClient } from '../../utils/apiClient';
import { CATEGORY_ENDPOINTS, HOME_ENDPOINTS } from '../endpoints';
import type { dailyQuestionResponse, homeResponse } from '../types/home';

export const getHomeData = async (): Promise<homeResponse['data']> => {
  const response = await apiClient.get<homeResponse>(HOME_ENDPOINTS.HOME);
  if (!response.data) {
    throw new Error('홈화면을 조회할 수 없습니다');
  }
  return response.data;
};

export const getDailyQuestion = async (
  categoryId: number,
): Promise<dailyQuestionResponse['data']> => {
  const response = await apiClient.get<dailyQuestionResponse>(
    `${CATEGORY_ENDPOINTS.GET_CATEGORY}/${categoryId}/question`,
  );
  if (!response.data) {
    throw new Error('오늘의 질문을 조회할 수 없습니다');
  }
  return response.data;
};

export const homeService = {
  getHomeData,
  getDailyQuestion,
};
