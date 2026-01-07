import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, type UpdateTopicNameResponse } from '../../api/services/adminService';

export const useUpdateTopicName = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTopicNameResponse, Error, { topicId: number; topicName: string }>({
    mutationFn: ({ topicId, topicName }) => adminService.updateTopicName(topicId, topicName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
