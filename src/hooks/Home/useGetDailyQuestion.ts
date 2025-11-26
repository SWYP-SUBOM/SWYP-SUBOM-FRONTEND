import { useQuery } from '@tanstack/react-query';
import { homeService } from '../../api/services/homeService';

export const useGetDailyQuestion = (categoryId: number) => {
  return useQuery({
    queryKey: ['dailyquestion', categoryId],
    queryFn: () => homeService.getDailyQuestion(categoryId),
  });
};
