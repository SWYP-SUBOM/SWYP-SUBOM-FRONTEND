import type { ReactNode } from 'react';
import { useTabStore } from '../../../store/useTabStore';

export const TabList = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full gap-2 overflow-x-auto whitespace-nowrap  ">{children}</div>;
};

export const Trigger = ({
  children,
  categoryName,
}: {
  children: ReactNode;
  categoryName: string;
}) => {
  const setIsActive = useTabStore((state) => state.setIsActive);
  const activeTab = useTabStore((state) => state.activeTab);

  const isActive = activeTab === categoryName;

  return (
    <button
      onClick={() => setIsActive(categoryName)}
      className={`items-center text-center px-3 py-[6px] rounded-lg cursor-pointer
      ${isActive ? 'text-white bg-[var(--color-b7)] B02_B' : 'hover:bg-gray-200 active:bg-gray-200 B02_M text-gray-800 border border-gray-400'}`}
    >
      {children}
    </button>
  );
};

export const Content = ({
  children,
  categoryName,
}: {
  children: ReactNode;
  categoryName: string;
}) => {
  const activeTab = useTabStore((state) => state.activeTab);
  if (activeTab !== categoryName) return null;
  return <div>{children}</div>;
};

export const Tabs = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

Tabs.TabList = TabList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
