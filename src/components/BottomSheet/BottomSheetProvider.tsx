import { useBottomSheet } from '../../hooks/useBottomSheet';

export function BottomSheetProvider({ children }: { children: React.ReactNode }) {
  const { BottomContent } = useBottomSheet();

  return (
    <>
      {children}
      {BottomContent}
    </>
  );
}
