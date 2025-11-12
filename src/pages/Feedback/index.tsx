import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CategoryNameType } from '../../constants/Category';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { WriteLayout } from '../../layout/WriteLayout';
import { FeedbackLoading } from '../Write/FeedbackLoading';
import { FeedbackBanner } from './_components/FeedbackBanner';
import { FeedbackBox } from './_components/FeedbackBox';

export const FeedBack = () => {
  const location = useLocation();
  const { postId, aiFeedbackId } = location.state as {
    postId: number;
    aiFeedbackId: number;
  };

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(postId, aiFeedbackId);

  const isProcessing = AIFeedBackData?.status === 'PROCESSING';

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

  return (
    <>
      <WriteLayout isSaveDisabled={true}>
        <div className="relative min-h-[100dvh] flex flex-col pt-[30px] min-h-[100dvh] px-4 bg-[#F3F5F8]">
          <FeedbackBanner>써봄이가 피드백을 준비했어요!</FeedbackBanner>
          <div className="flex-1">
            {!isLoading && AIFeedBackData?.status === 'COMPLETED' && (
              <FeedbackBox
                strength={AIFeedBackData?.strength}
                improvementPoints={AIFeedBackData?.improvementPoints}
              />
            )}
            <div className="h-[30px]" />
            <div className="w-[340px] absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300 ">
              <button className="cursor-pointer flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B">
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
        </div>
      </WriteLayout>
      {(isLoading || isProcessing) && <FeedbackLoading />}
    </>
  );
};
