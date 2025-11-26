import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CategoryNameType } from '../../constants/Category';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { WriteLayout } from '../../layout/WriteLayout';
import { FeedbackLoading } from '../Write/FeedbackLoading';
import { Rating } from '../Write/Rating';
import { FeedbackBanner } from './_components/FeedbackBanner';
import { FeedbackBox } from './_components/FeedbackBox';

export const FeedBack = () => {
  const location = useLocation();
  const { postId, aiFeedbackId } = location.state as {
    postId: number;
    aiFeedbackId: number;
  };

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(postId, aiFeedbackId);
  const updateAndSaveMutation = useUpdateAndSavePost();
  const { data: postData } = useGetPost(postId);

  const isProcessing = AIFeedBackData?.status === 'PROCESSING';
  const grade = AIFeedBackData?.grade;
  const [showRating, setShowRating] = useState(true);

  useEffect(() => {
    if (!isProcessing && grade) {
      const timer = setTimeout(() => setShowRating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, grade]);

  const content = postData?.content ?? '';
  const showLoading = isProcessing || isLoading;

  const { categoryName, topicName } = useParams<{
    categoryName: CategoryNameType;
    topicName: string;
  }>();

  if (!categoryName) return null;

  const encodedTopicName = encodeURIComponent(topicName!);

  const navigate = useNavigate();
  const movetoComplement = () => {
    navigate(`/complement/${categoryName}/${encodedTopicName}`, {
      state: { postId, aiFeedbackId },
    });
  };

  const handlePublishPost = () => {
    updateAndSaveMutation.mutate(
      { postId, status: 'PUBLISHED', content },
      {
        onSuccess: () => {
          try {
            navigate('/complete');
          } catch (err) {
            console.error('작성완료 실패:', err);
          }
        },
      },
    );
  };

  return (
    <>
      <WriteLayout isSaveDisabled={true}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-[100dvh] flex flex-col pt-[30px] min-h-[100dvh] px-4 bg-[#F3F5F8]"
        >
          <FeedbackBanner>써봄이가 피드백을 준비했어요!</FeedbackBanner>
          <div className="flex-1">
            {AIFeedBackData?.status === 'COMPLETED' && (
              <FeedbackBox
                strength={AIFeedBackData?.strength}
                improvementPoints={AIFeedBackData?.improvementPoints}
              />
            )}
            <div className="h-[50px]" />
          </div>
          <div className="sticky bottom-0 left-0 right-0 flex justify-center bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300">
            <div className="flex gap-2 w-[340px]">
              <button
                onClick={handlePublishPost}
                className="cursor-pointer flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B"
              >
                작성완료
              </button>
              <button
                onClick={movetoComplement}
                className="cursor-pointer flex-3 h-14 bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white rounded-xl B02_B"
              >
                보완하기
              </button>
            </div>
          </div>
        </motion.div>
      </WriteLayout>
      {showLoading && <FeedbackLoading />}
      {!isProcessing && grade && showRating && <Rating grade={grade} />}
    </>
  );
};
