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
      const previousPost = queryClient.getQueryData<PostResponse['data']>(queryKey);
      const newReactionId = REACTION_MAP[reactionTypeName];
      if (!previousPost || !newReactionId) return { previousPost: undefined };

      queryClient.setQueryData<PostResponse['data']>(['post', postId], (old) => {
        if (!old) return old;
        const currentReactionId = old.myReaction?.reactionId;
        const oldReactions = old.reactions ?? [];
        let found = false;

        const newReactions = oldReactions.map((reaction) => {
          if (reaction.reactionId === currentReactionId) {
            return { ...reaction, reactionCount: reaction.reactionCount - 1 };
          } else if (reaction.reactionId === newReactionId) {
            found = true;
            return { ...reaction, reactionCount: reaction.reactionCount + 1 };
          }
          return reaction;
        });

        if (!found) {
          newReactions.push({
            reactionId: newReactionId,
            reactionName: reactionTypeName,
            reactionCount: 1,
          });
        }

        const newMyReaction = {
          reactionId: newReactionId,
          reactionName: reactionTypeName,
        };
        console.log(reactionTypeName);
        console.log(newReactions);
        return {
          ...old,
          reactions: newReactions,
          myReaction: newMyReaction,
        };
      });

      return { previousPost };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSettled: () => {},
  });
};

export const useDeleteReaction = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => postService.deletePostReaction(postId),
    async onMutate() {
      const queryKey = ['post', postId];
      const previousPost = queryClient.getQueryData<PostResponse['data']>(queryKey);

      if (!previousPost) return { previousPost: undefined };
      queryClient.setQueryData<PostResponse['data']>(['post', postId], (old) => {
        if (!old) return old;

        const currentReactionId = old.myReaction?.reactionId;
        const newReactions = (old.reactions ?? []).map((reaction) => {
          if (reaction.reactionId === currentReactionId) {
            return { ...reaction, reactionCount: reaction.reactionCount - 1 };
          }
          return reaction;
        });

        return {
          ...old,
          reactions: newReactions,
          myReaction: null,
        };
      });

      return { previousPost };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSettled: () => {},
  });
};
