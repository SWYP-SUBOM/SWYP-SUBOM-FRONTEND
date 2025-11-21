import rightIcon from '../../../../assets/Feed/right.svg';
import { CategoryChip } from '../../../../components/common/CategoryChip';
import type { CategoryNameType } from '../../../../constants/Category';

interface MyPostCardProps {
  category: string;
  question: string;
  summary: string;
  status: string;
  date: string;
  onClick: () => void;
}

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    PUBLISHED: '보완',
  };
  return statusMap[status] || status;
};

export const MyPostCard = ({
  category,
  question,
  summary,
  status,
  date,
  onClick,
}: MyPostCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow relative duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {category && <CategoryChip categoryName={category as CategoryNameType} />}
          {status === 'PUBLISHED' && (
            <div className="inline-block px-2.5 py-1 border border-[#FF5222] rounded-lg">
              <span className="B03_B text-[#FF5222]">{getStatusLabel(status)}</span>
            </div>
          )}
        </div>
        <div className="shrink-0 pt-1">
          <img src={rightIcon} alt="right" className="w-6 h-6" />
        </div>
      </div>
      <div className="B03_1_M text-gray-800 mb-2">{question}</div>
      <div className="B02_B text-gray-900 mb-3 ">{summary}</div>
      <div className="flex justify-end mt-2">
        <span className="C01_SB text-gray-700">{date}</span>
      </div>
    </div>
  );
};
