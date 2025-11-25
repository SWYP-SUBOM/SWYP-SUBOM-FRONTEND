import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import xButton from '../../../assets/Modal/xbutton.svg';
import { GUIDE_MAP, type guideTopicType } from '../../../constants/Guide';
import { useModal } from '../../../hooks/useModal';
import { GuideContent } from './GuideContent';

interface GuideModalProps {
  topicType: guideTopicType;
}

export const GuideFadeOverlay = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export const GuideOverlay = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();
  return (
    <div
      onClick={closeModal}
      className="absolute inset-0 mx-auto backdrop-blur-[30px] bg-[#121212]/70 max-w-[380px] flex items-center justify-center z-200"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export const Xbutton = () => {
  const { closeModal } = useModal();
  return (
    <button
      className="cursor-pointer flex items-center pt-4 justify-end w-full group"
      onClick={closeModal}
      type="button"
    >
      <div className="B02_M text-gray-500 group-hover:text-gray-200 group-active:text-gray-200">
        닫기
      </div>
      <div className="rounded-[10px] w-8 h-8 flex items-center justify-center">
        <img src={xButton} className="w-6 h-6" alt="xButton" />
      </div>
    </button>
  );
};

export function GuideModal({ topicType }: GuideModalProps) {
  return createPortal(
    <>
      <GuideOverlay>
        <div className="items-center justify-center text-center">
          <div className="B02_B text-gray-100 pb-[47px]">가이드</div>
          <div className="T01_B pb-2.5">
            <span className="T01_B text-white">이 주제는 </span>
            <span className="T01_B text-[var(--color-b5)]">{GUIDE_MAP[topicType].title}</span>
            <span className="T01_B text-white"> 구조에요</span>
          </div>
          <div className="B02_B text-white whitespace-pre-line text-center pb-[19px]">
            {GUIDE_MAP[topicType].subtitle}
          </div>
        </div>
        <GuideContent topicType={topicType} />
        <Xbutton />
      </GuideOverlay>
    </>,
    document.body,
  );
}
