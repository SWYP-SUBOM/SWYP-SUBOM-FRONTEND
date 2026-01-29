import { useQuery } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const useGetPopularPost = () => {
  return useQuery({
    queryKey: ['popularpost'],
    queryFn: () => postService.getPopularPost(),
  });
};
