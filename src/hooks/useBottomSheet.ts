import { useBottomSheetStore } from '../store/useBottomSheetStore';

export const useBottomSheet = () => {
  const isBottomOpen = useBottomSheetStore((state) => state.isBottomOpen);
  const openBottomSheet = useBottomSheetStore((state) => state.openBottomSheet);
  const closeBottomSheet = useBottomSheetStore((state) => state.closeBottomSheet);
  const BottomContent = useBottomSheetStore((state) => state.BottomContent);

  return {
    isBottomOpen,
    openBottomSheet,
    closeBottomSheet,
    BottomContent,
  };
};
