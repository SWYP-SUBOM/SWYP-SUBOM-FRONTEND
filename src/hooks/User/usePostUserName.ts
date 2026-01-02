import { useMutation } from '@tanstack/react-query';
import { userService } from '../../api/services/userService';

export const usePostUserName = () => {
  return useMutation({
    mutationFn: (name: string) => userService.postUserName(name),
  });
};
