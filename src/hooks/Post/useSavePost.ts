import { useMutation } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const useSavePost = () => {
  return useMutation({
    mutationFn: ({
      categoryId,
      topicId,
      content,
    }: {
      categoryId: number;
      topicId: number;
      content: string;
    }) => postService.savePost(categoryId, topicId, content),
  });
};
