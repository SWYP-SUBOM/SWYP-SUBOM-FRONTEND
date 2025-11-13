import { useMutation } from '@tanstack/react-query';
import { feedBackService } from '../../api/services/feedBackService';

export const usePostAIFeedBack = () => {
  return useMutation({
    mutationFn: (postId: number) => feedBackService.postAIfeedBack(postId),
  });
};
