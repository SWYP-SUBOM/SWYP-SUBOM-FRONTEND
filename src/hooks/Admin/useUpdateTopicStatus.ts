import { useMutation } from '@tanstack/react-query';
import {
  adminService,
  type UpdateTopicStatusResponse,
  type TopicStatus,
} from '../../api/services/adminService';

export const useUpdateTopicStatus = () => {
  return useMutation<UpdateTopicStatusResponse, Error, { topicId: number; status: TopicStatus }>({
    mutationFn: ({ topicId, status }) => adminService.updateTopicStatus(topicId, status),
  });
};
