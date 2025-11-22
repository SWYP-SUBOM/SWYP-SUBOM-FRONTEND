import rightIcon from '../../../../assets/Feed/right.svg';
import { CategoryChip } from '../../../../components/common/CategoryChip';
import type { CategoryNameType } from '../../../../constants/Category';

interface ReactionPostCardProps {
  category: string;
  question: string;
  reaction: string;
  date: string;
  onClick: () => void;
}

export const ReactionPostCard = ({
  category,
  question,
  reaction,
  date,
  onClick,
}: ReactionPostCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow relative duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="inline-block  rounded-md mb-3">
            {category && <CategoryChip categoryName={category as CategoryNameType} />}
          </div>
          <div className="B02_M text-gray-900 mb-3 leading-relaxed">{question}</div>
          <div className="B02_B text-gray-900 mb-3 leading-relaxed">{reaction}</div>
        </div>
        <div className="shrink-0">
          <img src={rightIcon} alt="right" className="w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-end mt-3 -mr-2">
        <span className="C01_SB text-gray-700">{date}</span>
      </div>
    </div>
  );
};
