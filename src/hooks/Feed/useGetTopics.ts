import { useQuery } from '@tanstack/react-query';
import { feedService } from '../../api/services/feedService';

export const useGetTopics = (categoryId: number, sort: string) => {
  return useQuery({
    queryKey: ['topics', categoryId, sort],
    queryFn: () => feedService.getTopics(categoryId, sort),
  });
};
