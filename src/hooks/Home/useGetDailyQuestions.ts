import { useQuery } from '@tanstack/react-query';
import { homeService } from '../../api/services/homeService';

export const useGetDailyQuestions = () => {
  return useQuery({
    queryKey: ['dailyquestions'],
    queryFn: () => homeService.getDailyQuestions(),
  });
};
