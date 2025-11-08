import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import warning from '../../assets/BottomSheet/warning.svg';
import xButton from '../../assets/Modal/xbutton.svg';
import { useBottomSheet } from '../../hooks/useBottomSheet';

export const Overlay = ({ children }: { children: ReactNode }) => {
  const { closeBottomSheet } = useBottomSheet();
  return (
    <motion.div
      onClick={closeBottomSheet}
      className="fixed inset-0 flex w-[360px] mx-auto items-end justify-center bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
};
export const Xbutton = () => {
  const { closeBottomSheet } = useBottomSheet();
  return (
    <button
      onClick={closeBottomSheet}
      className="cursor-pointer rounded-[10px] absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-[#E7EBEE] active:bg-[#E7EBEE]"
      type="button"
    >
      <img src={xButton} className="w-8 h-8" alt="xButton" />
    </button>
  );
};

export const Content = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="relative bg-[#F9F9F9] w-[360px] h-[339px] py-6 rounded-tl-2xl rounded-tr-2xl px-4 flex flex-col items-center"
      initial={{ y: 339 }}
      animate={{ y: 0 }}
      exit={{ y: 339 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className="pb-6 pt-[50px] flex justify-center items-center">
        <img src={warning} className="w-[70px] h-[70px]" alt="warning" />
      </div>
      <div className="flex flex-col items-center w-full">{children}</div>
    </motion.div>
  );
};

export const Title = ({ children }: { children: ReactNode }) => {
  return <div className="items-center justify-center T01_B">{children}</div>;
};

export const Description = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block items-center justify-center text-center break-normal whitespace-normal B02_M pt-2 pb-[34px] text-gray-800">
      {children}
    </div>
  );
};

export const Trigger = ({
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
}: {
  leftText: string;
  rightText: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}) => {
  return (
    <div className="flex w-full gap-3">
      <button
        className="flex-1 h-14 bg-[#E7EBEE] rounded-xl text-gray-750 font-medium"
        onClick={onLeftClick}
      >
        {leftText}
      </button>
      <button
        className="flex-1 h-14 cursor-pointer bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] rounded-xl text-white font-medium"
        onClick={onRightClick}
      >
        {rightText}
      </button>
    </div>
  );
};

export const BottomSheet = ({ children }: { children: ReactNode }) => {
  return createPortal(
    <AnimatePresence>
      <div className="z-50">{children}</div>
    </AnimatePresence>,
    document.body,
  );
};

BottomSheet.Content = Content;
BottomSheet.Overlay = Overlay;
BottomSheet.Title = Title;
BottomSheet.Description = Description;
BottomSheet.Trigger = Trigger;
