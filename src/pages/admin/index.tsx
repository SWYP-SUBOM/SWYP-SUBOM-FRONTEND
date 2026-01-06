import { useState } from 'react';
import { Header } from '../../components/admin/common/Header';
import { Category } from '../../components/admin/Category';
import { QuestionCard } from '../../components/admin/QuestionCard';
import { CategorySelectBottomSheet } from '../../components/admin/CategorySelectBottomSheet';

import arrowdown from '../../assets/admin/arrowdown.svg';

const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const week = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];

// 예시 데이터
const exampleQuestions = [
  {
    id: 1,
    category: '일상' as const,
    question: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
    date: '2025.12.10',
  },
  {
    id: 2,
    category: '시대·사회' as const,
    question: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
    date: '2025.12.09',
  },
  {
    id: 3,
    category: '인간관계' as const,
    question: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
    date: '2025.12.08',
  },
];

export const Admin = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string | number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const handleCheckChange = (id: string | number, checked: boolean) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header title="써봄 워크스페이스" button="질문 삭제" />

      <div className="w-full flex flex-col px-4 pt-10 ">
        <div className="B01_M text-gray-900">
          {month}월 {day}일 ({week})
        </div>

        <Category />

        {/* 카테고리 선택 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsCategorySheetOpen(true)}
            className="w-[110px] mt-4  flex items-center  px-[10px] gap-2 justify-center border border-gray-500 rounded-lg  py-2 cursor-pointer"
          >
            <span className="B02_M text-gray-800">카테고리</span>
            <img src={arrowdown} alt="arrowdown" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {exampleQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              category={question.category}
              question={question.question}
              date={question.date}
              isChecked={checkedIds.has(question.id)}
              onCheckChange={handleCheckChange}
            />
          ))}
        </div>
      </div>

      {/* 카테고리 선택 바텀시트 */}
      {isCategorySheetOpen && (
        <CategorySelectBottomSheet
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
          onClose={() => setIsCategorySheetOpen(false)}
        />
      )}
    </div>
  );
};
