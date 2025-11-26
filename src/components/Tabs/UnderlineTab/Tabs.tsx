import type { ReactNode } from 'react';
import { useTabStore } from '../../../store/useTabStore';

export const TabList = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full gap-5 px-4">{children}</div>;
};

export const Trigger = ({ children, categoryId }: { children: ReactNode; categoryId: number }) => {
  const setIsActive = useTabStore((state) => state.setIsActive);
  const activeTab = useTabStore((state) => state.activeTab);

  const isActive = activeTab === categoryId;

  return (
    <button
      onClick={() => setIsActive(categoryId)}
      className={`cursor-pointer items-center relative pb-[3px] text-center transition-colors
      ${
        isActive
          ? 'text-blue-500 B02_B  whitespace-nowrap'
          : 'B02_M text-gray-500 hover:!text-gray-750 active:!text-gray-750  whitespace-nowrap'
      }
    `}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full ${
          isActive ? 'bg-[var(--color-b7)]' : 'bg-transparent'
        }`}
      />
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
