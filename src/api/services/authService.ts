import type { InternalAxiosRequestConfig } from 'axios';
import { OAUTH_ENDPOINTS, USER_ENDPOINTS } from '../endpoints';
import { apiClient } from '../../utils/apiClient';

export const kakaoLoginUrl = (): string => {
  return `${import.meta.env.VITE_API_BASE_URL}${OAUTH_ENDPOINTS.KAKAO_LOGIN}`;
};

export const OAuthToken = async (): Promise<string> => {
  return apiClient.OAuthToken(OAUTH_ENDPOINTS.OAUTH_JWT_HEADER);
};

export interface ReissueResponse {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
}

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

// 리프레시 토큰은 apiClient의 interceptor에서 자동으로 처리됩니다.
// 이 함수는 수동 호출이 필요한 경우를 위해 남겨두었습니다.
export const reissueToken = async (): Promise<string | null> => {
  // interceptor에서 처리되므로 여기서는 null 반환
  // 실제 사용 시에는 axiosInstance를 직접 사용해야 합니다.
  return null;
};

export const logout = async (): Promise<LogoutResponse> => {
  return apiClient.post<LogoutResponse>(OAUTH_ENDPOINTS.LOGOUT, {}, {
    withCredentials: true,
  } as InternalAxiosRequestConfig);
};

export const unregister = async (): Promise<UnregisterResponse> => {
  return apiClient.post<UnregisterResponse>(USER_ENDPOINTS.UNREGISTER, {});
};

export const authService = {
  kakaoLoginUrl,
  OAuthToken,
  reissueToken,
  logout,
  unregister,
};
