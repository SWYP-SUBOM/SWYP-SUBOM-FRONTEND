import { homeService } from '../../../api/services/homeService';
import { useModal } from '../../../hooks/useModal';
import { queryClient } from '../../../main';
import { useTodayPostInfoStore } from '../../../store/useTodayPostInfo';
import { CompleteDailyQuestionModal } from '../_components/CompleteDailyQuestionModal';
import { DailyQuestionModal } from '../_components/DailyQuestionModal';
import type { CategoryBoxPropsType } from './CategoryBox.types';

export const CategoryBox = ({
  title,
  titleColor,
  icon,
  size,
  categoryId,
}: CategoryBoxPropsType) => {
  const { openModal } = useModal();

  const todayPost = useTodayPostInfoStore((state) => state.todayPost);
  const isTodayPublished = todayPost.postStatus === 'PUBLISHED';

  const prefetchQuestion = (categoryId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['dailyquestion', categoryId],
      queryFn: () => homeService.getDailyQuestion(categoryId),
    });
  };

  const handleModalOpen = (categoryId: number) => {
    if (isTodayPublished) {
      openModal(<CompleteDailyQuestionModal />);
    } else {
      openModal(<DailyQuestionModal categoryId={categoryId} key={categoryId} />);
    }
  };

  return (
    <>
      <div
        onClick={() => handleModalOpen(categoryId)}
        onMouseEnter={() => prefetchQuestion(categoryId)}
        className={`rounded-xl p-4 relative bg-[var(--color-white)] ${size === 'large' ? 'flex-2 min-h-[136px]' : 'flex-1 min-h-[89px]'}
           transition-shadow duration-300 cursor-pointer
           hover:shadow-[0_0_30px_0_#D0D2D9] active:shadow-[0_0_30px_0_#D0D2D9]`}
      >
        <div className="B02_B" style={{ color: titleColor }}>
          {title}
        </div>
        <img
          src={icon}
          className="w-[56px] h-[57px] absolute bottom-4 right-4 object-contain shrink-0"
        />
      </div>
    </>
  );
};
