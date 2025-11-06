import type { ReactNode } from 'react';
import { useTabStore } from '../../../store/useTabStore';

export const TabList = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full gap-5 px-2">{children}</div>;
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
      className={`items-center relative pb-[3px] text-center
      ${isActive ? 'text-blue-500 B02_B' : 'B02_M text-gray-500'}`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full transition-all ${
          isActive ? 'bg-[var(--color-b7)]' : 'bg-transparent'
        }`}
      />
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
