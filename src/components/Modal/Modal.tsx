import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import xButton from '../../assets/Modal/xbutton.svg';
import { useModal } from '../../hooks/useModal';

export const FadeOverlay = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export const ScaleContent = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
  >
    {children}
  </motion.div>
);

export const Overlay = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();
  return (
    <FadeOverlay>
      <div
        onClick={closeModal}
        className="absolute inset-0 mx-auto bg-[#121212]/50 max-w-[400px] flex items-center justify-center"
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </FadeOverlay>
  );
};

export const Xbutton = () => {
  const { closeModal } = useModal();
  return (
    <button
      onClick={closeModal}
      className="cursor-pointer rounded-[10px] absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-[#E7EBEE] active:bg-[#E7EBEE]"
      type="button"
    >
      <img src={xButton} className="w-8 h-8" alt="xButton" />
    </button>
  );
};

export const Content = ({ children }: { children: ReactNode }) => {
  return (
    <ScaleContent>
      <div className="relative bg-[#F9F9F9] w-[328px] max-h-[320px] py-6 rounded-2xl px-5">
        {children}
      </div>
    </ScaleContent>
  );
};

export const Title = ({ children }: { children: ReactNode }) => {
  return <div className="items-center justify-center T02_B pt-[56px]">{children}</div>;
};

export const Description = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block items-center justify-center text-center max-w-[260px] break-normal whitespace-normal B01_M pt-[10px] pb-[31px] text-gray-800">
      {children}
    </div>
  );
};

export const Trigger = ({
  children,
  handleClickButton,
}: {
  children: ReactNode;
  handleClickButton: () => void;
}) => {
  return (
    <button
      onClick={handleClickButton}
      className="cursor-pointer rounded-xl 
    bg-[var(--color-b7)] active:bg-[var(--color-b8)]
    hover:bg-[var(--color-b8)] w-full h-14 B02_B text-white"
    >
      {children}
    </button>
  );
};

export const Modal = ({ children }: { children: ReactNode }) => {
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </AnimatePresence>,
    document.body,
  );
};

Modal.Content = Content;
Modal.Overlay = Overlay;
Modal.Xbutton = Xbutton;
Modal.Title = Title;
Modal.Description = Description;
Modal.Trigger = Trigger;
