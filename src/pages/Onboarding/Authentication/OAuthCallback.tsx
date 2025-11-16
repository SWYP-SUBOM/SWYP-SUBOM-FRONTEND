import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthToken } from '../../../hooks/useOAuthToken';
import { ROUTES } from '../../../routes/routes';
import { useAuthStore } from '../../../store/useAuthStore';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const mutation = useOAuthToken();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    mutation.mutate(undefined, {
      onSuccess: (token) => {
        // 로그인 성공 시 토큰을 store에 저장
        if (token) {
          setToken(token);
        }
        navigate(ROUTES.ONBOARDING_NAME_INPUT);
      },
      onError: () => {
        navigate(ROUTES.ONBOARDING_LOGIN);
      },
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-lg">로그인 처리 중...</div>
      </div>
    </div>
  );
};
