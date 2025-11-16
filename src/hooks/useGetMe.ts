import { useQuery } from '@tanstack/react-query';
import { userService } from '../api/services/userService';
import { getAccessToken } from '../utils/api';

export const useGetMe = () => {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ['me'],
    queryFn: () => userService.getMe(),
    enabled: !!accessToken,
  });
};
