import { useQuery } from '@tanstack/react-query';
import { userService } from '../api/services/userService';

export const useGetUserName = () => {
  return useQuery({
    queryKey: ['userName'],
    queryFn: () => userService.getUserName(),
  });
};
