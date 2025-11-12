import { create } from 'zustand';

interface TabState {
  activeTab: number;
  setIsActive: (categoryId: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 1,
  setIsActive: (categoryId) => set({ activeTab: categoryId }),
}));
