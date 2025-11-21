import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TitleHeader } from '../../components/common/TitleHeader';
import { CategoryChip } from '../../components/common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import { useGetDraftPost } from '../../hooks/Post/useGetPost';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { FeedLayout } from '../../layout/FeedLayout';
import { FeedbackModal } from './_components/FeedbackModal';

interface CalendarPostViewProps {
  postId: number;
  clickedDate?: string;
}

export const CalendarPostView = ({ postId, clickedDate }: CalendarPostViewProps) => {
  const { openBottomSheet } = useBottomSheet();
  const { data: editPostData } = useGetDraftPost(postId, 'edit', {
    enabled: !!postId,
  });

  const formatDateWithDay = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = format(date, 'E', { locale: ko });
    return format(date, `yyyy.M.d(${dayOfWeek})`, { locale: ko });
  };

  const displayDate = clickedDate || editPostData?.updatedAt;

  const handleViewFeedback = () => {
    if (editPostData?.topicInfo && editPostData?.aiFeedbackInfo) {
      let aiFeedbackId: number;
      if (typeof editPostData.aiFeedbackInfo === 'object' && editPostData.aiFeedbackInfo !== null) {
        aiFeedbackId = Number(
          (editPostData.aiFeedbackInfo as { aiFeedbackId?: number }).aiFeedbackId,
        );
      } else {
        aiFeedbackId = parseInt(String(editPostData.aiFeedbackInfo), 10);
      }

      if (!isNaN(aiFeedbackId) && aiFeedbackId > 0) {
        openBottomSheet(<FeedbackModal postId={postId} aiFeedbackId={aiFeedbackId} />);
      }
    }
  };

  if (!editPostData) {
    return null;
  }

  return (
    <FeedLayout
      header={
        <TitleHeader
          onlyNavigateBack={true}
          title={displayDate ? formatDateWithDay(displayDate) : ''}
        />
      }
    >
      <div className="px-4 pb-24 pt-5 bg-[#F3F5F8]">
        <div className="pt-3 pb-3">
          <CategoryChip categoryName={editPostData.topicInfo.categoryName as CategoryNameType} />
        </div>
        <div className="B01_B text-gray-900 pb-4">{editPostData.topicInfo.topicName}</div>
        <div className="relative w-full bg-white rounded-xl border border-gray-500 p-4 min-h-[360px]">
          <div className="B03_M text-gray-800 whitespace-pre-wrap pb-10">
            {editPostData.content}
          </div>
          <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
            {editPostData.content.length} / 700
          </div>
        </div>
        {editPostData.aiFeedbackInfo && (
          <div className="flex justify-end mt-3 ">
            <button
              onClick={handleViewFeedback}
              className="B03_B cursor-pointer rounded-full px-4 py-3 bg-[#F9F9F9] text-b7 border border-b7 hover:bg-gray-200 active:bg-gray-200 flex items-center justify-center gap-2"
            >
              받았던 피드백 보기 →
            </button>
          </div>
        )}
      </div>
    </FeedLayout>
  );
};
