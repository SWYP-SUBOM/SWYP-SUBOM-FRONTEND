import type { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  Content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  Content: null,
  openModal: (content) => set({ isOpen: true, Content: content }),
  closeModal: () => set({ isOpen: false, Content: null }),
}));
