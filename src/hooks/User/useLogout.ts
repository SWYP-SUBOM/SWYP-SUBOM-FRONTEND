import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { fcmService } from '../../api/services/fcmService';
import { requestForToken } from '../../firebase-config';
import { ROUTES } from '../../routes/routes';
import { useAuthStore } from '../../store/useAuthStore';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      try {
        const token = await requestForToken();
        if (token && typeof token === 'string') {
          await fcmService.deleteFCMToken(token);
          console.log('FCM 토큰 삭제 완료');
        }
      } catch (e) {
        console.log('FCM 토큰 삭제 실패:', e);
      }
      return authService.logout();
    },
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
