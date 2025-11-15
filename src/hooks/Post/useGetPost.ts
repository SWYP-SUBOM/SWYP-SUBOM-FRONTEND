import { useQuery } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const useGetPost = (postId: number, context?: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['post', postId, context],
    queryFn: () => postService.getPost(postId, context),
    enabled: options?.enabled ?? !!postId,
  });
};
