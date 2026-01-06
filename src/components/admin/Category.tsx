import { useRef, useState } from 'react';

const CATEGORY_NAME = {
  categoryName: ['전체', '승인 질문', '미승인 질문', '논리형 질문', '구조형 질문'],
} as const;

export const Category = () => {
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
        {CATEGORY_NAME.categoryName.map((name, index) => (
          <div
            key={index}
            className="category-item B02_M rounded-lg px-3 py-[6px] border border-gray-400 text-gray-800 hover:bg-b7 hover:text-white! cursor-pointer transition-all duration-200 shrink-0"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
