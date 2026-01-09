import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { feedService } from '../../api/services/feedService';

export const useGetFeed = (categoryId: number, topicId?: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['feed', categoryId, topicId],
    initialPageParam: { curUpdatedAt: '', curPostId: 0 },
    queryFn: ({ pageParam }) =>
      feedService.getFeed(categoryId, pageParam.curUpdatedAt, pageParam.curPostId, topicId),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return {
          curUpdatedAt: lastPage.curUpdatedAt,
          curPostId: lastPage.curPostId,
        };
      }
      return undefined;
    },
  });
};
