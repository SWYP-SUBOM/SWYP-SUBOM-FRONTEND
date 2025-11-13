import { useMutation } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const useUpdateAndSavePost = () => {
  return useMutation({
    mutationFn: ({
      postId,
      status,
      content,
    }: {
      postId: number;
      status: string;
      content: string;
    }) => postService.updateAndSavePost(postId, status, content),
  });
};
