import { useQuery } from '@tanstack/react-query';
import { calendarService } from '../../api/services/calendarService';
import { getAccessToken } from '../../utils/api';
import type { CalendarRequest } from '../../api/types/calendar';

export const useGetCalendar = (params: CalendarRequest) => {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ['calendar', params.year, params.month],
    queryFn: () => calendarService.getCalendar(params),
    enabled: !!accessToken,
  });
};
