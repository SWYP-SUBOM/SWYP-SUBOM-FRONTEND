import type { ReactNode } from 'react';
import { create } from 'zustand';

interface BottomSheetState {
  isBottomOpen: boolean;
  BottomContent: ReactNode | null;
  openBottomSheet: (BottomContent: ReactNode) => void;
  closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isBottomOpen: false,
  BottomContent: null,
  openBottomSheet: (BottomContent) => set({ isBottomOpen: true, BottomContent: BottomContent }),
  closeBottomSheet: () => set({ isBottomOpen: false, BottomContent: null }),
}));
