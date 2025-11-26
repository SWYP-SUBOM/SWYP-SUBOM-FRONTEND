import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';
import type { PostResponse } from '../../api/types/post';

export const REACTION_MAP = {
  LIKE: 1,
  EMPATHY: 2,
  INSIGHTFUL: 3,
} as const;

export type ReactionNameType = keyof typeof REACTION_MAP;

export const usePutReaction = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reactionTypeName }: { reactionTypeName: ReactionNameType }) =>
      postService.putPostReaction(postId, reactionTypeName),
    async onMutate({ reactionTypeName }) {
      const queryKey = ['post', postId];
      const previousPost = queryClient.getQueryData<PostResponse>(queryKey);
      const newReactionId = REACTION_MAP[reactionTypeName];

      if (!previousPost || !newReactionId) return { previousPost: undefined };

      queryClient.setQueryData<PostResponse>(['post', postId], (old) => {
        if (!old?.data) return old;

        const currentReactionId = old.data.myReaction?.reactionId;
        const newReactions = (old.data.reactions ?? []).map((reaction) => {
          if (reaction.reactionId === currentReactionId) {
            return { ...reaction, reactionCount: reaction.reactionCount - 1 };
          } else if (reaction.reactionId === newReactionId) {
            return { ...reaction, reactionCount: reaction.reactionCount + 1 };
          }
          return reaction;
        });

        const newMyReaction = {
          reactionId: newReactionId,
          reactionName: reactionTypeName,
        };

        return {
          ...old,
          data: {
            ...old.data,
            reactions: newReactions,
            myReaction: newMyReaction,
          },
        };
      });

      return { previousPost };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};

export const useDeleteReaction = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => postService.deletePostReaction(postId),
    async onMutate() {
      const queryKey = ['post', postId];
      const previousPost = queryClient.getQueryData<PostResponse>(queryKey);

      if (!previousPost) return { previousPost: undefined };
      queryClient.setQueryData<PostResponse>(['post', postId], (old) => {
        if (!old) return old;

        const currentReactionId = old.data.myReaction?.reactionId;
        const newReactions = (old.data.reactions ?? []).map((reaction) => {
          if (reaction.reactionId === currentReactionId) {
            return { ...reaction, reactionCount: reaction.reactionCount - 1 };
          }
          return reaction;
        });

        return {
          ...old,
          data: {
            ...old.data,
            reactions: newReactions,
            myReaction: null,
          },
        };
      });

      return { previousPost };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};
