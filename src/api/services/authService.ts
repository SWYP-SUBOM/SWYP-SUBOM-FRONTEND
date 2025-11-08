import { OAUTH_ENDPOINTS } from '../endpoints';
import { apiClient } from '../../utils/apiClient';

export const kakaoLoginUrl = (): string => {
  return `${import.meta.env.VITE_API_BASE_URL}${OAUTH_ENDPOINTS.KAKAO_LOGIN}`;
};

export const OAuthToken = async (): Promise<string> => {
  return apiClient.OAuthToken(OAUTH_ENDPOINTS.OAUTH_JWT_HEADER);
};
