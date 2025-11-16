import { OAUTH_ENDPOINTS, USER_ENDPOINTS } from '../endpoints';
import { apiClient } from '../../utils/apiClient';

export const kakaoLoginUrl = (): string => {
  return `${import.meta.env.VITE_API_BASE_URL}${OAUTH_ENDPOINTS.KAKAO_LOGIN}`;
};

export const OAuthToken = async (): Promise<string> => {
  return apiClient.OAuthToken(OAUTH_ENDPOINTS.OAUTH_JWT_HEADER);
};

export interface LogoutResponse {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
}

export interface UnregisterResponse {
  success: boolean;
  code: string;
  message: string;
  data: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  return apiClient.post<LogoutResponse>(OAUTH_ENDPOINTS.LOGOUT, {});
};

export const unregister = async (): Promise<UnregisterResponse> => {
  return apiClient.post<UnregisterResponse>(USER_ENDPOINTS.UNREGISTER, {});
};

export const authService = {
  kakaoLoginUrl,
  OAuthToken,
  logout,
  unregister,
};
