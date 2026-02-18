import { useNavigate } from 'react-router-dom';
import { GuestBottomSheet } from '../../../components/common/GuestBottomSheet';
import { CATEGORIES } from '../../../constants/Categories';
import type { CategoryNameType } from '../../../constants/Category';
import { CATEGORY_TAG_COLOR_MAP } from '../../../constants/CategoryMap';
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
      const pendingData = {
        categoryId,
        categoryName: categoryName as CategoryNameType,
        topicName: topicName || '',
        topicId,
        topicType: topicType || '',
        isTodayDraft: false,
      };
      openBottomSheet(<GuestBottomSheet pendingData={pendingData} />);
      return;
    }

    if (isTodayDraft && todayPost?.categoryId !== categoryId) {
      openBottomSheet(
        <IsDraftBottomSheet
          draftPostId={todayPost!.postId!}
          isTodayDraft={isTodayDraft}
          prevData={{
            categoryName: todayPost?.categoryName || '',
            topicName: todayPost?.topicName || '',
            categoryId: todayPost?.categoryId || 0,
            topicId: todayPost?.topicId || 0,
            aiFeedbackId: todayPost?.aiFeedbackId,
            topicType: todayPost?.topicType || '',
          }}
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

  const categoryColor = CATEGORY_TAG_COLOR_MAP[
    categoryName as keyof typeof CATEGORY_TAG_COLOR_MAP
  ] || { text: 'text-gray-900' };

  return (
    <div
      className={`
        relative flex flex-col items-center
        transition-opacity duration-500 ease-in-out
        w-full h-full
        ${isActive ? 'opacity-100' : 'opacity-40'} 
      `}
    >
      <div className="relative w-full h-[246px] shrink-0 mb-2">
        <img
          src={category?.illustration}
          alt={category?.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="mb-[14px] T02_B text-center">
        오늘의 <span className={`${categoryColor.text}`}>{categoryName}</span> 주제
      </div>
      <div className="flex-grow flex items-start justify-center px-6">
        <p className="text-center text-gray-900 B01_M break-keep">{topicName}</p>
      </div>
      <div
        className={`mt-[41px] w-full flex-shrink-0 transition-all duration-300 px-4  ${
          isActive ? 'visible' : 'invisible'
        }`}
      >
        <button
          disabled={isTodayPublished || !topicId}
          onClick={handleWriteClick}
          className={`
            w-full h-[56px] rounded-xl bg-white B03-1_M transition-all border border-gray-500 text-gray-750
            flex items-center justify-center
            ${isTodayPublished ? 'opacity-70' : 'cursor-pointer active:scale-[0.98]'}
          `}
        >
          {topicId ? (isTodayPublished ? '글쓰기 완료!' : '시작하기') : '로딩 중'}
        </button>
      </div>
    </div>
  );
};
