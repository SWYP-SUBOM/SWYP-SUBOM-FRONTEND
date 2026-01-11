import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../api/services/adminService';

export const useStartTopicGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => adminService.startTopicGeneration(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
