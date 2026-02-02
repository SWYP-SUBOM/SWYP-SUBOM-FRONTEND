import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { ROUTES } from '../../routes/routes';
import { useAuthStore } from '../../store/useAuthStore';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userName'] });
      logoutStore();
      navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      queryClient.removeQueries({ queryKey: ['userName'] });
      logoutStore();
      navigate(ROUTES.HOME, { replace: true });
    },
  });
};
