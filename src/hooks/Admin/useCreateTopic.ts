import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../api/services/adminService';

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      topicData,
    }: {
      categoryId: number;
      topicData: { topicName: string; topicType: 'QUESTION' | 'LOGIC' };
    }) => adminService.createTopic(categoryId, topicData),
    onSuccess: () => {
      // topics 리스트 새로고침
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });
    },
  });
};
