import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, type UpdateTopicReservationResponse } from '../../api/services/adminService';

export const useUpdateTopicReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateTopicReservationResponse, Error, { topicId: number; usedAt?: string }>({
    mutationFn: ({ topicId, usedAt }) => adminService.updateTopicReservation(topicId, usedAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
