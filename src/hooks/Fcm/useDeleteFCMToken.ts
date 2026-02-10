import { useMutation } from '@tanstack/react-query';
import { fcmService } from '../../api/services/fcmService';

export const useDeleteFCMToken = () => {
  return useMutation({
    mutationFn: (token: string) => fcmService.deleteFCMToken(token),
    onSuccess: () => {
      console.log('서버 DB에서 FCM 토큰 삭제 성공');
    },
    onError: (error) => {
      console.error('FCM 토큰 삭제 실패:', error);
    },
  });
};
