import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import pointsToImproveIcon from '../../../assets/Feedback/pointsToImprove.svg';
import strengthIcon from '../../../assets/Feedback/strength.svg';
import xButton from '../../../assets/Modal/xbutton.svg';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { useGetAIFeedBack } from '../../../hooks/FeedBack/uesGetAIFeedBack';
import { useBottomSheet } from '../../../hooks/useBottomSheet';

interface FeedbackModalProps {
  postId: number;
  aiFeedbackId: number;
}

const CenterOverlay = ({ children }: { children: ReactNode }) => {
  const { closeBottomSheet } = useBottomSheet();
  return (
    <motion.div
      onClick={closeBottomSheet}
      className="fixed inset-0 flex w-[400px] z-200 mx-auto h-full items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
};

// 중앙에 표시되는 커스텀 Content
const CenterContent = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="relative bg-[#F9F9F9] w-[328px] max-h-[80vh] rounded-2xl px-5 py-6 overflow-y-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const FeedbackModal = ({ postId, aiFeedbackId }: FeedbackModalProps) => {
  const { data: AIFeedBackData, isLoading, error } = useGetAIFeedBack(postId, aiFeedbackId);
  const { closeBottomSheet } = useBottomSheet();

  return (
    <BottomSheet>
      <CenterOverlay>
        <div className="relative">
          <button
            onClick={closeBottomSheet}
            className="absolute -top-12 right-0 z-10 cursor-pointer rounded-[10px] w-8 h-8 flex items-center justify-center hover:bg-gray-300 active:bg-gray-300 bg-[#F9F9F9]"
            type="button"
          >
            <img src={xButton} className="w-8 h-8" alt="close" />
          </button>
          <CenterContent>
            {isLoading && (
              <div className="py-8 text-center text-gray-500">피드백을 불러오는 중...</div>
            )}
            {error && (
              <div className="py-8 text-center text-red-500">
                피드백을 불러오는 중 오류가 발생했습니다.
              </div>
            )}
            {!isLoading && !error && AIFeedBackData && AIFeedBackData.status === 'COMPLETED' && (
              <>
                <div className="flex gap-2 mb-2">
                  <img src={strengthIcon} className="w-6 h-6" alt="strength" />
                  <span className="text-[var(--color-b5)] B02_B pb-2">강점</span>
                </div>
                <div className="B03_M text-gray-900 mb-4">{AIFeedBackData.strength}</div>
                <div className="border-t border-[#E0E4E7] my-4"></div>
                <div className="flex gap-2 mb-2">
                  <img src={pointsToImproveIcon} className="w-6 h-6" alt="improvement" />
                  <span className="text-[var(--color-b5)] B02_B pb-2">개선 포인트</span>
                </div>
                {AIFeedBackData.improvementPoints?.map((point, index) => (
                  <div key={index} className="B03_M text-gray-900 mb-2">
                    {point}
                  </div>
                ))}
              </>
            )}
            {!isLoading && !error && AIFeedBackData && AIFeedBackData.status === 'PROCESSING' && (
              <div className="py-8 text-center text-gray-500">피드백을 생성하는 중...</div>
            )}
            {!isLoading && !error && !AIFeedBackData && (
              <div className="py-8 text-center text-gray-500">피드백 데이터가 없습니다.</div>
            )}
          </CenterContent>
        </div>
      </CenterOverlay>
    </BottomSheet>
  );
};
