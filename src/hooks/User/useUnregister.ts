import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { ROUTES } from '../../routes/routes';
import { useAuthStore } from '../../store/useAuthStore';

export const useUnregister = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authService.unregister(),
    onSuccess: () => {
      // Store에서 로그아웃 처리 (토큰 제거, 상태 초기화)
      logoutStore();
      // 로그인 페이지로 리다이렉트
      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    },
    onError: (error) => {
      console.error('회원탈퇴 실패:', error);
      // 에러가 발생해도 로컬 상태는 정리
      logoutStore();
      // 로그인 페이지로 리다이렉트
      navigate(ROUTES.ONBOARDING_LOGIN, { replace: true });
    },
  });
};
