import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  adminService,
  type UpdateTopicStatusResponse,
  type TopicStatus,
} from '../../api/services/adminService';

export const useUpdateTopicStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTopicStatusResponse, Error, { topicId: number; status: TopicStatus }>({
    mutationFn: ({ topicId, status }) => adminService.updateTopicStatus(topicId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
