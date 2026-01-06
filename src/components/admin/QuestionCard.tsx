import { useState } from 'react';
import { CategoryChip } from '../common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import menu from '../../assets/admin/menu.svg';
import Reply from '../../assets/admin/Reply.svg';

interface QuestionCardProps {
  id: string | number;
  category: CategoryNameType;
  question: string;
  date: string;
  isChecked?: boolean;
  onCheckChange?: (id: string | number, checked: boolean) => void;
  onClick?: () => void;
}

export const QuestionCard = ({
  id,
  category,
  question,
  date,
  isChecked = false,
  onCheckChange,
  onClick,
}: QuestionCardProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckChange?.(id, newChecked);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-300 flex items-start gap-3"
    >
      {/* 체크박스 */}
      <div
        onClick={handleCheckboxClick}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          checked ? 'bg-b7 border-b7' : 'bg-white border-gray-400 hover:border-b7'
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>

      {/* 카드 내용 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <CategoryChip categoryName={category} />
          <span className="C01_SB text-gray-700">{date}</span>
        </div>

        <div className="B03_M text-gray-900 leading-relaxed mb-3">{question}</div>

        <div className="flex justify-end">
          <div className="flex items-center gap-[8px]">
            <img src={menu} alt="menu" />
            <img src={Reply} alt="Reply" />
          </div>
        </div>
      </div>
    </div>
  );
};
