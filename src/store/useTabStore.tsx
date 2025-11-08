import { create } from 'zustand';

interface TabState {
  activeTab: string;
  setIsActive: (category: string) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: '일상',
  setIsActive: (category) => set({ activeTab: category }),
}));
