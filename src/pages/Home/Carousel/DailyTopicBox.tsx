import { useNavigate } from 'react-router-dom';
import { CategoryChip } from '../../../components/common/CategoryChip';
import { GuestBottomSheet } from '../../../components/common/GuestBottomSheet';
import { CATEGORIES } from '../../../constants/Categories';
import type { CategoryNameType } from '../../../constants/Category';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTodayPostInfoStore } from '../../../store/useTodayPostInfo';
import { IsDraftBottomSheet } from '../_components/IsDraftBottomSheet';

interface DailyTopicBoxProps {
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  topicName?: string;
  topicId?: number;
  topicType?: string;
}

export const DailyTopicBox = ({
  categoryId,
  categoryName,
  isActive,
  topicName,
  topicId,
  topicType,
}: DailyTopicBoxProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { openBottomSheet } = useBottomSheet();
  const todayPost = useTodayPostInfoStore((state) => state.todayPost);
  const isTodayDraft = todayPost?.postStatus === 'DRAFT';
  const isTodayPublished =
    todayPost.postStatus === 'PUBLISHED' || todayPost.postStatus === 'PUBLISHED_WITHCLICK';

  const category = CATEGORIES.find((c) => c.categoryId === categoryId) || CATEGORIES[0];
  const aiFeedbackId = todayPost?.aiFeedbackId;

  const handleWriteClick = () => {
    if (!topicId) return;

    if (!isLoggedIn) {
      openBottomSheet(<GuestBottomSheet />);
      return;
    }

    // 임시저장 글이 있는데, 클릭한 카테고리가 기존과 다를 경우
    if (isTodayDraft && todayPost?.categoryId !== categoryId) {
      openBottomSheet(
        <IsDraftBottomSheet
          draftPostId={todayPost!.postId!}
          isTodayDraft={isTodayDraft}
          // 이어쓰기
          prevData={{
            categoryName: todayPost?.categoryName || '',
            topicName: todayPost?.topicName || '',
            categoryId: todayPost?.categoryId || 0,
            topicId: todayPost?.topicId || 0,
            aiFeedbackId: todayPost?.aiFeedbackId,
            topicType: todayPost?.topicType || '',
          }}
          // 새로쓰기
          newData={{
            categoryId,
            categoryName,
            topicName: topicName || '',
            topicId,
            topicType: topicType || '',
          }}
        />,
      );
      return;
    }

    if (isTodayDraft && aiFeedbackId) {
      navigate(
        `/complement/${encodeURIComponent(categoryName)}/${encodeURIComponent(topicName || '')}/${encodeURIComponent(topicType || '')}`,
        {
          state: {
            categoryName,
            topicName,
            topicId,
            categoryId,
            postId: todayPost?.postId,
            aiFeedbackId,
            topicType,
          },
        },
      );
      return;
    }

    navigate('/write', {
      state: {
        categoryId,
        categoryName,
        topicName,
        topicId,
        topicType,
        draftPostId: isTodayDraft ? todayPost?.postId : undefined,
        isTodayDraft: isTodayDraft,
      },
    });
  };

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl px-4 py-5 bg-white
        transition-opacity duration-500 ease-in-out
        w-full h-full
        ${isActive ? 'opacity-100 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]' : 'opacity-40'} 
      `}
    >
      <div className="mb-2 flex-shrink-0 h-[154px]">
        <img
          src={category?.illustration}
          alt={category?.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <div className="mb-[6px]">
        <CategoryChip categoryName={category?.name as CategoryNameType} />
      </div>

      <div className="flex-grow flex items-start">
        <p className="text-left text-gray-900 B03-1_M">{topicName}</p>
      </div>

      <div
        className={`mt-4 flex-shrink-0 transition-all duration-300 ${isActive ? 'visible' : 'invisible'}`}
      >
        <button
          disabled={isTodayPublished || !topicId}
          onClick={handleWriteClick}
          className={`w-full rounded-xl bg-white py-2 B03-1_M transition-transform border border-gray-500 text-gray-750
    ${isTodayPublished ? 'cursor-pointer opacity-70' : 'cursor-pointer'}
  `}
        >
          {topicId ? (isTodayPublished ? '글쓰기 완료!' : '글쓰러 가기') : '로딩 중'}
        </button>
      </div>
    </div>
  );
};
