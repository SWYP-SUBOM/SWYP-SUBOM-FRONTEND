import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/services/authService';

export const useOAuthToken = () => {
  return useMutation({
    mutationFn: () => authService.OAuthToken(),
  });
};
