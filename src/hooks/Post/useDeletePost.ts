import { useMutation } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const useDeletePost = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => postService.deletePost(postId),
  });
};
