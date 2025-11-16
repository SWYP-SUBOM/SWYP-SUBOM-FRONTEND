import { apiClient } from '../../utils/apiClient';
import { CALENDAR_ENDPOINTS } from '../endpoints';
import type { CalendarRequest, CalendarResponse } from '../types/calendar';

export const getCalendar = async (params: CalendarRequest): Promise<CalendarResponse['data']> => {
  const queryParams = new URLSearchParams();
  queryParams.append('year', params.year.toString());
  queryParams.append('month', params.month.toString());

  const url = `${CALENDAR_ENDPOINTS.GET_CALENDAR}?${queryParams.toString()}`;
  const response = await apiClient.get<CalendarResponse>(url);
  if (!response.data) {
    throw new Error('캘린더 정보를 조회할 수 없습니다.');
  }
  return response.data;
};

export const calendarService = {
  getCalendar,
};
