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
      if (lastPage?.sliceInfo?.hasNext) {
        return lastPage.sliceInfo.nextCursorId;
      }
      return undefined;
    },
    enabled: !!accessToken,
  });
};
