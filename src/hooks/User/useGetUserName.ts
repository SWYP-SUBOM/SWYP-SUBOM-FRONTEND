import { useQuery } from '@tanstack/react-query';
import { userService } from '../../api/services/userService';
import { getAccessToken } from '../../utils/api';

export const useGetUserName = () => {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ['userName'],
    queryFn: () => userService.getUserName(),
    enabled: !!accessToken,
  });
};
