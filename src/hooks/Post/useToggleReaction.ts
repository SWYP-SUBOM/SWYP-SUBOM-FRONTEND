import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';

export const usePutReaction = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reactionTypeName }: { reactionTypeName: string }) =>
      postService.putPostReaction(postId, reactionTypeName),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};

export const useDeleteReaction = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => postService.deletePostReaction(postId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};
