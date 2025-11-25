import { useInfiniteQuery } from '@tanstack/react-query';
import { postService } from '../../api/services/postService';
import { getAccessToken } from '../../utils/api';
import type { MyWritingsRequest } from '../../api/types/post';

export const useGetMyWritings = (params: Omit<MyWritingsRequest, 'cursorId'> = {}) => {
  const accessToken = getAccessToken();

  return useInfiniteQuery({
    queryKey: ['myWritings', params],
    queryFn: ({ pageParam = 0 }) =>
      postService.getMyWritings({
        ...params,
        cursorId: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageInfo && !lastPage.pageInfo.isLast) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!accessToken,
  });
};
