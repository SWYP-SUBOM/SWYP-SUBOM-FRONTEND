import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthToken } from '../../../hooks/useOAuthToken';
import { ROUTES } from '../../../routes/routes';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const mutation = useOAuthToken();

  useEffect(() => {
    mutation.mutate(undefined, {
      onSuccess: () => {
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
