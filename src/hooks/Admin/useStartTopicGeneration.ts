import { useMutation } from '@tanstack/react-query';
import { adminService } from '../../api/services/adminService';

export const useStartTopicGeneration = () => {
  return useMutation({
    mutationFn: () => adminService.startTopicGeneration(),
  });
};
