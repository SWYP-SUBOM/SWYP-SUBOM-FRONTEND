import { useQuery } from '@tanstack/react-query';
import { homeService } from '../../api/services/homeService';

export const useGetHome = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: () => homeService.getHomeData(),
  });
};
