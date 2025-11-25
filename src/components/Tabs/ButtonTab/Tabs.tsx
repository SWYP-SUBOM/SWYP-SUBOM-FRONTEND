import { useRef, type ReactNode } from 'react';
import { useTabStore } from '../../../store/useTabStore';

export const TabList = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: any) => {
    isDown = true;
    startX = e.pageX - ref.current!.offsetLeft;
    scrollLeft = ref.current!.scrollLeft;
  };

  const onMouseUp = () => (isDown = false);
  const onMouseLeave = () => (isDown = false);

  const onMouseMove = (e: any) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ref.current!.offsetLeft;
    const walk = (x - startX) * 1;
    ref.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={ref}
      className="flex w-full gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
};

export const Trigger = ({ children, categoryId }: { children: ReactNode; categoryId: number }) => {
  const setIsActive = useTabStore((state) => state.setIsActive);
  const activeTab = useTabStore((state) => state.activeTab);

  const isActive = activeTab === categoryId;

  return (
    <button
      onClick={() => setIsActive(categoryId)}
      className={`items-center text-center px-3 py-[6px] rounded-lg cursor-pointer
      ${isActive ? 'text-white bg-[var(--color-b7)] B02_B' : 'hover:bg-gray-200 active:bg-gray-200 B02_M text-gray-800 border border-gray-400'}`}
    >
      {children}
    </button>
  );
};

export const Content = ({ children, categoryId }: { children: ReactNode; categoryId: number }) => {
  const activeTab = useTabStore((state) => state.activeTab);
  if (activeTab !== categoryId) return null;
  return <div>{children}</div>;
};

export const Tabs = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

Tabs.TabList = TabList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
