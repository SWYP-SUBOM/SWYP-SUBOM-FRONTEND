import { useParams } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader';
import { CategoryChip } from '../../components/common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { useGetDraftPost } from '../../hooks/Post/useGetPost';
import { FeedLayout } from '../../layout/FeedLayout';
import { FeedbackBanner } from '../Feedback/_components/FeedbackBanner';
import { FeedbackBox } from '../Feedback/_components/FeedbackBox';

export const FeedbackView = () => {
  const { postId: postIdParam } = useParams<{ postId: string }>();
  const postId = Number(postIdParam);

  const { data: editPostData } = useGetDraftPost(postId, 'edit', {
    enabled: !!postId,
  });

  let aiFeedbackId: number | null = null;
  if (editPostData?.aiFeedbackInfo) {
    if (typeof editPostData.aiFeedbackInfo === 'object' && editPostData.aiFeedbackInfo !== null) {
      aiFeedbackId = Number(
        (editPostData.aiFeedbackInfo as { aiFeedbackId?: number }).aiFeedbackId,
      );
    } else {
      aiFeedbackId = parseInt(String(editPostData.aiFeedbackInfo), 10);
    }
  }

  const isValidAiFeedbackId = !!aiFeedbackId && aiFeedbackId > 0 && !isNaN(aiFeedbackId);

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(
    postId,
    isValidAiFeedbackId ? (aiFeedbackId as number) : 0,
  );

  if (!editPostData || !aiFeedbackId || aiFeedbackId <= 0) return null;

  const categoryName = editPostData.topicInfo?.categoryName as CategoryNameType;
  const topicName = editPostData.topicInfo?.topicName;

  return (
    <FeedLayout header={<TitleHeader onlyNavigateBack={true} title="오늘의 주제" />}>
      <div className="px-4 pt-5 bg-gray-100 min-h-screen pb-24">
        <div className="pb-3 pt-3 ">
          <CategoryChip categoryName={categoryName} />
          <div className="py-[10px] B01_B text-gray-900">{topicName}</div>
        </div>

        <div className="relative w-full bg-white rounded-xl border border-gray-500 p-4 min-h-[360px]">
          <div className="B03_M text-gray-800 whitespace-pre-wrap pb-10">
            {editPostData?.content || ''}
          </div>
          {editPostData && (
            <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
              {editPostData.content.length} / 700
            </div>
          )}
        </div>
        <div className="pt-[10px]">
          <FeedbackBanner>
            막막하다면 써봄이의 피드백을 <br /> 참고해서 수정해보세요!
          </FeedbackBanner>
        </div>
        <div>
          {AIFeedBackData && !isLoading && (
            <FeedbackBox
              strength={AIFeedBackData.strength}
              improvementPoints={AIFeedBackData.improvementPoints}
            />
          )}
        </div>
        <div className="h-[50px]" />
      </div>
    </FeedLayout>
  );
};
