import { useInfiniteQuery } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';
import { getAccessToken } from '../../utils/api';
import type { MyReactionsRequest } from '../../api/types/post';

export const useGetMyReactions = (params: Omit<MyReactionsRequest, 'cursorId'> = {}) => {
  const accessToken = getAccessToken();

  return useInfiniteQuery({
    queryKey: ['myReactions', params],
    queryFn: ({ pageParam = 0 }) =>
      postService.getMyReactions({
        ...params,
        cursorId: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.sliceInfo?.hasNext) {
        return lastPage.sliceInfo.nextCursorId;
      }
      return undefined;
    },
    enabled: !!accessToken,
  });
};
