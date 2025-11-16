import { useQuery } from '@tanstack/react-query';
import { feedBackService } from '../../api/services/feedBackService';
import type { getAIfeedBackResponse } from '../../api/types/feedBack';

export const useGetAIFeedBack = (postId: number, aiFeedbackId: number) => {
  return useQuery<getAIfeedBackResponse['data']>({
    queryKey: ['post', postId, aiFeedbackId],
    queryFn: () => feedBackService.getAIfeedBack(postId, aiFeedbackId),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === 'PROCESSING') return 5000;
      return false;
    },
    refetchOnWindowFocus: true,
  });
};
