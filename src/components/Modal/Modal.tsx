import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import xButton from '../../assets/Modal/xbutton.svg';
import { useModal } from '../../hooks/useModal';

export const Overlay = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();
  return (
    <div
      onClick={closeModal}
      className="absolute inset-0 bg-[#121212]/50 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
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
    <div className="relative bg-[#F9F9F9] max-w-[328px] max-h-[288px] w-full py-6 rounded-2xl px-5">
      {children}
    </div>
  );
};

export const Title = ({ children }: { children: ReactNode }) => {
  return <div className="items-center justify-center T02_B pt-[56px]">{children}</div>;
};

export const Description = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block items-center justify-center text-center max-w-[240px] break-normal whitespace-normal B01_M pt-[10px] pb-[31px] text-gray-800">
      {children}
    </div>
  );
};

export const Trigger = ({ children }: { children: ReactNode }) => {
  return (
    <button
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
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center">
      {children}
    </div>,
    document.body,
  );
};

Modal.Content = Content;
Modal.Overlay = Overlay;
Modal.Xbutton = Xbutton;
Modal.Title = Title;
Modal.Description = Description;
Modal.Trigger = Trigger;
