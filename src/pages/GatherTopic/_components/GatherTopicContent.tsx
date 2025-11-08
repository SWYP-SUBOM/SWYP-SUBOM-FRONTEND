import { useState } from 'react';
import { SelectBox } from '../../../components/SelectBox/SelectBox';
import { SelectSortBottomSheet } from './SelectSortBottomSheet';

export const GatherTopicContent = ({ categoryName }: { categoryName: string }) => {
  const questions = [
    {
      topicId: 90031,
      questionText: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
      createdAt: '2025-12-11',
    },
    {
      topicId: 90030,
      questionText:
        '요즘 카공족들이 정말 많은 것 같아요. 실제로 카페에서 공부하는 것이 도서관이나 집에서 하는 것보다 잘된다고 생각하시나요?',
      createdAt: '2025-12-10',
    },
  ];

  const selectSortItems = ['최신순', '오래된순'];

  const [selectedSort, setSelectedSort] = useState('최신순');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <div className="pt-[26px] flex justify-end">
        <SelectBox label={selectedSort} onClick={() => setIsBottomSheetOpen(true)} />
      </div>
      <div className="flex flex-col gap-[10px] pt-[14px]">
        {questions.map((question) => (
          <>
            <div key={question.topicId}>
              <div className="B03_M text-gray-900 pb-[14px]">{question.questionText}</div>
              <div className="C01_SB text-gray-700 text-right mt-1">{question.createdAt}</div>
              <div className="border-t border-[#E0E4E7] my-4"></div>
            </div>
          </>
        ))}
      </div>
      {isBottomSheetOpen && (
        <SelectSortBottomSheet
          title="정렬 기준"
          selectItems={selectSortItems}
          selected={selectedSort}
          onSelect={setSelectedSort}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}
    </>
  );
};
