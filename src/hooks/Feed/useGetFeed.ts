import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { feedService } from '../../api/services/feedService';

export const useGetFeed = (categoryId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['feed', categoryId],
    initialPageParam: { curUpdatedAt: '', curPostId: 0 },
    queryFn: ({ pageParam }) =>
      feedService.getFeed(categoryId, pageParam.curUpdatedAt, pageParam.curPostId),
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
