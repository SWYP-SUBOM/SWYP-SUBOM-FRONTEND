import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../utils/apiClient';
import { OAUTH_ENDPOINTS } from '../../../api/endpoints';

export const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        await apiClient.OAuthToken(OAUTH_ENDPOINTS.OAUTH_JWT_HEADER);
        navigate('/onboarding/Nameinput');
      } catch (error) {
        navigate('/onboarding/Login');
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-lg">로그인 처리 중...</div>
      </div>
    </div>
  );
};
