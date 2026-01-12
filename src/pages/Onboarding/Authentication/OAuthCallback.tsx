import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOAuthToken } from '../../../hooks/User/useOAuthToken';
import { ROUTES } from '../../../routes/routes';
import { useAuthStore } from '../../../store/useAuthStore';
import { GAEvents } from '../../../utils/GAEvent';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mutation = useOAuthToken();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    mutation.mutate(undefined, {
      onSuccess: (token) => {
        // 로그인 성공 시 토큰을 store에 저장
        if (token) {
          setToken(token);
          GAEvents.loginSuccess();
        }

        // URL 쿼리 파라미터에서 name 가져오기
        const name = searchParams.get('name');

        // username이 "no"면 닉네임 입력 페이지로, 아니면 홈으로
        if (name === 'no') {
          navigate(ROUTES.ONBOARDING_NAME_INPUT);
        } else {
          navigate(ROUTES.HOME);
        }
      },
      onError: () => {
        navigate(ROUTES.ONBOARDING_LOGIN);
      },
    });
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-lg">로그인 처리 중...</div>
      </div>
    </div>
  );
};
