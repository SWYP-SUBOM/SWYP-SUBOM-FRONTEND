import { useQuery } from '@tanstack/react-query';
import { adminService, type GetTopicsRequest } from '../../api/services/adminService';

export const useGetTopics = (params?: GetTopicsRequest) => {
  return useQuery({
    queryKey: ['adminTopics', params?.mode, params?.categoryId],
    queryFn: () => adminService.getTopics(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
