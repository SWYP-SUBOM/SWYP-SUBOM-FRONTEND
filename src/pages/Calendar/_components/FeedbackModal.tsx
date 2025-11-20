import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';
import { CategoryChip } from '../../../components/common/CategoryChip';
import type { CategoryNameType } from '../../../constants/Category';
import { useGetAIFeedBack } from '../../../hooks/FeedBack/uesGetAIFeedBack';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { FeedbackBox } from '../../Feedback/_components/FeedbackBox';

interface FeedbackModalProps {
  postId: number;
  aiFeedbackId: number;
  categoryName: CategoryNameType;
}

// 중앙에 표시되는 커스텀 Overlay
const CenterOverlay = ({ children }: { children: ReactNode }) => {
  const { closeBottomSheet } = useBottomSheet();
  return (
    <motion.div
      onClick={closeBottomSheet}
      className="fixed inset-0 flex w-[380px] z-200 mx-auto h-full items-center justify-center bg-black/50"
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

  return (
    <BottomSheet>
      <CenterOverlay>
        <CenterContent>
          <Xbutton />
          <div className="pt-3 pb-3"></div>
          {isLoading && (
            <div className="py-8 text-center text-gray-500">피드백을 불러오는 중...</div>
          )}
          {error && (
            <div className="py-8 text-center text-red-500">
              피드백을 불러오는 중 오류가 발생했습니다.
            </div>
          )}
          {!isLoading && !error && AIFeedBackData && AIFeedBackData.status === 'COMPLETED' && (
            <FeedbackBox
              strength={AIFeedBackData.strength}
              improvementPoints={AIFeedBackData.improvementPoints}
            />
          )}
          {!isLoading && !error && AIFeedBackData && AIFeedBackData.status === 'PROCESSING' && (
            <div className="py-8 text-center text-gray-500">피드백을 생성하는 중...</div>
          )}
          {!isLoading && !error && !AIFeedBackData && (
            <div className="py-8 text-center text-gray-500">피드백 데이터가 없습니다.</div>
          )}
        </CenterContent>
      </CenterOverlay>
    </BottomSheet>
  );
};
