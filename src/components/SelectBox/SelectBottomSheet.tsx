import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SelectBottomSheetType = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const SelectBottomSheet = ({ title, children, onClose }: SelectBottomSheetType) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex max-w-[380px] mx-auto bg-black/50 justify-center items-end z-200"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white w-full rounded-t-2xl p-5"
      >
        <div className="w-[48px] h-[4px] bg-gray-700 rounded-full mx-auto mb-12" />
        <div className="text-center T02_B text-gray-900 mb-[27px]">{title}</div>
        {children}
      </motion.div>
    </div>
  );
};
