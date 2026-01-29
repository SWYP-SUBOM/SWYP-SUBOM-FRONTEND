import { useNavigate } from 'react-router-dom';
import { CategoryChip } from '../../../components/common/CategoryChip';
import { CATEGORIES } from '../../../constants/Categories';
import type { CategoryNameType } from '../../../constants/Category';
import { useTodayPostInfoStore } from '../../../store/useTodayPostInfo';

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
  const todayPost = useTodayPostInfoStore((state) => state.todayPost);
  const isTodayPublished =
    todayPost.postStatus === 'PUBLISHED' || todayPost.postStatus === 'PUBLISHED_WITHCLICK';

  const category = CATEGORIES.find((c) => c.categoryId === categoryId) || CATEGORIES[0];

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
          onClick={() =>
            navigate('/write', {
              state: {
                categoryId,
                categoryName,
                topicName,
                topicId,
                topicType,
              },
            })
          }
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
