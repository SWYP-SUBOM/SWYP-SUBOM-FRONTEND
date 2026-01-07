import { useState, useEffect } from 'react';
import { CategoryChip } from '../common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import menu from '../../assets/admin/menu.svg';
import Reply from '../../assets/admin/Reply.svg';
import check from '../../assets/admin/check.svg';
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

export const QuestionCard = ({
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

  // question prop이 변경되면 editedQuestion 업데이트
  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  // isChecked prop이 변경되면 내부 state 업데이트
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

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
          className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
            checked ? 'bg-b7 border-b7' : 'bg-gray-300 border-gray-600'
          }`}
        >
          {checked && (
            <svg
              className="w-7 h-7 text-white"
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
                if (isChecked) {
                  onCalendarClick?.(id);
                }
              }}
              className={`cursor-pointer  transition-opacity ${
                !isChecked ? '  cursor-not-allowed' : 'bg-gray-200 rounded-md'
              }`}
              disabled={!isChecked}
            >
              <img src={menu} alt="calendar" />
            </button>
            {isEditing ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveEdit?.(id, editedQuestion);
                }}
                className="B03-1_M flex gap-1 text-b6 px-3 py-1 rounded-md bg-b1 cursor-pointer"
              >
                <img src={check} alt="check" />
                수정 완료
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isChecked) {
                    onEditClick?.(id);
                  }
                }}
                className={`cursor-pointer transition-opacity ${
                  !isChecked ? ' cursor-not-allowed' : 'bg-gray-200 rounded-md'
                }`}
                disabled={!isChecked}
              >
                <img src={Reply} alt="edit" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
