import { create } from 'zustand';

interface HomeDraftSheetState {
  isDraftSheetOpened: boolean;
  setDraftSheetOpened: (value: boolean) => void;
}

export const useHomeDraftSheetStore = create<HomeDraftSheetState>((set) => ({
  isDraftSheetOpened: false,
  setDraftSheetOpened: (value) => set({ isDraftSheetOpened: value }),
}));
