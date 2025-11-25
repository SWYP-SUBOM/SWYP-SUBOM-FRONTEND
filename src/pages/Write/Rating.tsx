import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import gradeBg from '../../assets/Write/grade-bg.png';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { RatingText } from '../../utils/RatingText';
import { FeedbackLoading } from './FeedbackLoading';

export function Rating() {
  const navigate = useNavigate();
  const location = useLocation();

  const { postId, aiFeedbackId, categoryName, topicName } = location.state as {
    postId: number;
    aiFeedbackId: number;
    categoryName: string;
    topicName: string;
  };

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(postId, aiFeedbackId);
  const grade = AIFeedBackData?.grade ?? 'B';
  const isProcessing = AIFeedBackData?.status === 'PROCESSING';
  const isNotReady = isLoading || isProcessing || !AIFeedBackData;

  const [readyToShowResult, setReadyToShowResult] = useState(false);

  useEffect(() => {
    if (!isNotReady) {
      setReadyToShowResult(true);
      const timer = setTimeout(() => {
        navigate(`/feedback/${encodeURIComponent(categoryName)}/${encodeURIComponent(topicName)}`, {
          state: { AIFeedBackData, postId, aiFeedbackId },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNotReady]);

  return createPortal(
    isNotReady ? (
      <FeedbackLoading />
    ) : (
      readyToShowResult && (
        <div className="fixed inset-0 flex items-center justify-center max-w-[380px] mx-auto bg-[#121212]/70 backdrop-blur-[15px] z-50">
          <div className="relative flex flex-col items-center justify-center max-w-[380px] mx-auto">
            <img src={gradeBg} className="w-38 h-38" alt="gradeBg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-12">
              <div className="text-white B03_B leading-none mb-[2px]">LEVEL</div>
              <div className="text-white text-[54px] font-bold leading-none">{grade}</div>
            </div>
            <div className="mt-6 flex flex-col items-center text-center gap-2">
              <div className="B01_B text-[var(--color-b4)] whitespace-pre-line">
                {RatingText(grade)}
              </div>
              <div className="B03_M text-gray-100">*이 등급은 AI가 채점한 결과입니다</div>
            </div>
          </div>
        </div>
      )
    ),
    document.body,
  );
}
