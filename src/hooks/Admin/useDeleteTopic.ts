import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, type DeleteTopicResponse } from '../../api/services/adminService';

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTopicResponse, Error, number>({
    mutationFn: (topicId) => adminService.deleteTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
