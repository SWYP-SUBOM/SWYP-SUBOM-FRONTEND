import { useRef, useState } from 'react';
import type { TopicMode } from '../../api/services/adminService';

const CATEGORY_NAME = {
  categoryName: ['전체', '승인 질문', '미승인 질문', '논리형 질문', '구조형 질문'],
} as const;

const MODE_MAP: Record<string, TopicMode> = {
  전체: 'ALL',
  '승인 질문': 'APPROVED',
  '미승인 질문': 'PENDING',
  '논리형 질문': 'LOGICAL',
  '구조형 질문': 'QUESTION',
} as const;

interface CategoryProps {
  selectedMode?: TopicMode;
  onModeSelect?: (mode: TopicMode) => void;
}

export const Category = ({ selectedMode = 'ALL', onModeSelect }: CategoryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    dragState.current.isDown = true;
    dragState.current.startX = e.pageX - ref.current.offsetLeft;
    dragState.current.scrollLeft = ref.current.scrollLeft;
    setIsDragging(true);
  };

  const onMouseUp = () => {
    dragState.current.isDown = false;
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    dragState.current.isDown = false;
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1;
    ref.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  return (
    <div
      ref={ref}
      className={`overflow-x-auto mt-6 hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="flex gap-2 whitespace-nowrap">
        {CATEGORY_NAME.categoryName.map((name, index) => {
          const mode = MODE_MAP[name];
          const isSelected = selectedMode === mode;
          return (
            <div
              key={index}
              onClick={() => onModeSelect?.(mode)}
              className={`category-item B02_M rounded-lg px-3 py-[6px] border cursor-pointer transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-b7 text-white border-b7'
                  : 'border-gray-400 text-gray-800 hover:bg-b7 hover:text-white!'
              }`}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
