import { apiClient } from '../../utils/apiClient';
import { ENDPOINTS } from '../endpoints';
import type { FCMResponse } from '../types/fcm';

export const postFCMToken = async (token: string): Promise<FCMResponse['data']> => {
  const response = await apiClient.post<FCMResponse>(ENDPOINTS.FCM, { token });

  return response.data;
};

export const deleteFCMToken = async (token: string): Promise<void> => {
  const url = `${ENDPOINTS.FCM}?token=${encodeURIComponent(token)}`;
  await apiClient.remove(url);
};

export const fcmService = {
  postFCMToken,
  deleteFCMToken,
};
