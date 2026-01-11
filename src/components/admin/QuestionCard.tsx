import { useState, useEffect, memo } from 'react';
import { CategoryChip } from '../common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import menuIcon from '../../assets/admin/Menu.svg';
import checkIcon from '../../assets/admin/check.svg';
import checkUpdateIcon from '../../assets/admin/checkupdate.svg';
import replyIcon from '../../assets/admin/Reply.svg';
import deleteIcon from '../../assets/admin/delete.svg';

interface QuestionCardProps {
  id: string | number;
  category: CategoryNameType;
  question: string;
  date: string;
  isChecked?: boolean;
  onCheckChange?: (id: string | number, checked: boolean) => void;
  onClick?: () => void;
  onCalendarClick?: (id: string | number) => void;
  onEditClick?: (id: string | number) => void;
  onSaveEdit?: (id: string | number, newQuestion: string) => void;
  isEditing?: boolean;
  isDeleteMode?: boolean;
  onDeleteClick?: (id: string | number) => void;
}

const QuestionCardComponent = ({
  id,
  category,
  question,
  date,
  isChecked = false,
  onCheckChange,
  onClick,
  onCalendarClick,
  onEditClick,
  onSaveEdit,
  isEditing = false,
  isDeleteMode = false,
  onDeleteClick,
}: QuestionCardProps) => {
  const [checked, setChecked] = useState(isChecked);
  const [editedQuestion, setEditedQuestion] = useState(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckChange?.(id, newChecked);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-300 flex items-start gap-3"
    >
      {/* 삭제 모드일 때 빨간색 마이너스 아이콘, 아니면 체크박스 */}
      {isDeleteMode ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.(id);
          }}
          className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer "
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      ) : (
        <div
          onClick={handleCheckboxClick}
          className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all  ${
            checked ? 'border-b7' : 'bg-gray-300 border-gray-600'
          }`}
        >
          {checked && <img src={checkIcon} alt="checkIcon" />}
        </div>
      )}

      {/* 카드 내용 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <CategoryChip categoryName={category} />
          {date && <span className="C01_SB text-gray-700">{date}</span>}
        </div>

        {isEditing ? (
          <div className="mb-3">
            <input
              type="text"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              onBlur={() => onSaveEdit?.(id, editedQuestion)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSaveEdit?.(id, editedQuestion);
                }
                if (e.key === 'Escape') {
                  setEditedQuestion(question);
                }
              }}
              className="w-full B03_M text-gray-900 leading-relaxed border-b-2 border-b7 focus:outline-none pb-1"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <div className="B03_M text-gray-900 leading-relaxed mb-3">{question}</div>
        )}

        <div className="flex justify-end">
          <div className="flex items-center gap-[8px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCalendarClick?.(id);
              }}
              className="cursor-pointer bg-gray-200 rounded-md transition-opacity hover:opacity-80"
            >
              <img src={menuIcon} alt="menuIcon" />
            </button>

            {isEditing ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveEdit?.(id, editedQuestion);
                }}
                className="B03-1_M flex gap-1 text-b6 px-3 py-1 rounded-md bg-b1 cursor-pointer"
              >
                <img src={checkUpdateIcon} alt="checkIcon" />
                수정 완료
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick?.(id);
                }}
                className="cursor-pointer bg-gray-200 rounded-md transition-opacity hover:opacity-80"
              >
                <img src={replyIcon} alt="replyIcon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuestionCard = memo(QuestionCardComponent);
