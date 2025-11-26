import EventSourcePolyfill from 'eventsource-polyfill';
import { apiClient } from '../../utils/apiClient';
import { NOTIFICATION_ENDPOINTS } from '../endpoints';
import type { NotificationResponse } from '../types/notification';

export const getNotification = async (
  limit = 10,
  cursor?: string,
): Promise<NotificationResponse['data']> => {
  let url = `${NOTIFICATION_ENDPOINTS.GET_NOTIFICATION}?limit=${limit}`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const response = await apiClient.get<NotificationResponse>(url);
  if (!response.data) {
    throw new Error('알람을 조회할 수 없습니다');
  }
  return response.data;
};

export const NotificationService = {
  getNotification,
};
