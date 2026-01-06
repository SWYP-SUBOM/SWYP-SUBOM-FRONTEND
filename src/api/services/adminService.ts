import { ADMIN_ENDPOINTS } from '../endpoints';
import { apiClient } from '../../utils/apiClient';

export interface AdminLoginRequest {
  email: string;
  password: string;
  totpCode: string;
}

export interface AdminLoginResponse {
  accessToken: string;
}

export const adminLogin = async (loginData: AdminLoginRequest): Promise<AdminLoginResponse> => {
  return apiClient.post<AdminLoginResponse>(ADMIN_ENDPOINTS.LOGIN, loginData);
};

export const adminService = {
  adminLogin,
};
