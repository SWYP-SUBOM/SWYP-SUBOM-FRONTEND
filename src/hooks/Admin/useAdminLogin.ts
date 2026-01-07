import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/services/adminService';
import { setAccessToken } from '../../utils/api';

export const useAdminLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginData: { email: string; password: string; totpCode: string }) =>
      adminService.adminLogin(loginData),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);

      navigate('/admin');
    },
    onError: (error) => {
      console.error('관리자 로그인 실패:', error);
    },
  });
};
