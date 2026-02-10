import { useMutation } from '@tanstack/react-query';
import { fcmService } from '../../api/services/fcmService';

export const usePostFCMToken = () => {
  return useMutation({
    mutationFn: (token: string) => fcmService.postFCMToken(token),
    onSuccess: () => console.log('FCM 토큰 저장 성공'),
  });
};
