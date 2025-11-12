import { useModalStore } from '../store/useModalStore';

export const useModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const Content = useModalStore((state) => state.Content);

  return {
    isOpen,
    openModal,
    closeModal,
    Content,
  };
};
