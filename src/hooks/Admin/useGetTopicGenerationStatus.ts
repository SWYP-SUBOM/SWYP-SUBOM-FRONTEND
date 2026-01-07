import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../api/services/adminService';

/**
 * 토픽 생성 작업 상태를 조회하는 React Query 훅
 * @param generationId - 조회할 토픽 생성 작업의 ID (null이면 쿼리 비활성화)
 *
 * API 스펙: GET /api/admin/topic/generation/{generationId}
 * 응답 데이터:
 * {
 *   success: boolean;
 *   code: string;
 *   message: string;
 *   data: {
 *     generationId: number;
 *     status: 'PROCESSING' | 'COMPLETED' | 'COMPLETED_WITH_ERRORS' | 'FAILED';
 *     errorMessage: string | null;
 *   };
 * }
 *
 * 상태별 의미:
 * - PROCESSING: 토픽 생성 작업이 진행 중입니다.
 * - COMPLETED: 토픽 생성이 성공적으로 완료되었습니다.
 * - COMPLETED_WITH_ERRORS: 토픽 생성이 완료되었지만, 일부 토픽에서 오류가 발생했습니다.
 * - FAILED: 토픽 생성 작업이 실패했습니다.
 */
export const useGetTopicGenerationStatus = (generationId: number | null) => {
  return useQuery({
    queryKey: ['topicGenerationStatus', generationId],
    queryFn: () => adminService.getTopicGenerationStatus(generationId!),
    enabled: generationId !== null,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.data.status === 'PROCESSING') {
        return 3000; // 3초마다 폴링
      }
      return false; // 완료되면 폴링 중지
    },
    refetchOnWindowFocus: false,
  });
};
