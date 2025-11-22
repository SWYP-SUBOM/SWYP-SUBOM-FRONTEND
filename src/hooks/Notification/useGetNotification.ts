import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { NotificationService } from '../../api/services/notificationService';

export const useGetNotification = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['notification'],
    initialPageParam: { limit: 10, cursor: '' },
    queryFn: ({ pageParam }) =>
      NotificationService.getNotification(pageParam.limit, pageParam.cursor),
    getNextPageParam: (lastPage) => {
      const cursor = lastPage.cursor;
      const hasMore = lastPage.hasMore;

      if (hasMore) {
        return {
          limit: 10,
          cursor,
        };
      }
      return undefined;
    },
  });
};
