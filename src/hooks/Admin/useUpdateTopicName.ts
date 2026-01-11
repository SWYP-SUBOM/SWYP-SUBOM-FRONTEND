import { useMutation } from '@tanstack/react-query';
import {
  adminService,
  type UpdateTopicResponse,
  type UpdateTopicRequest,
} from '../../api/services/adminService';

export const useUpdateTopic = () => {
  return useMutation<
    UpdateTopicResponse,
    Error,
    { topicId: number; updateData: UpdateTopicRequest }
  >({
    mutationFn: ({ topicId, updateData }) => adminService.updateTopic(topicId, updateData),
  });
};
