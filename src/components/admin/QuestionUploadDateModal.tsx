import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface QuestionUploadDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTomorrow: () => void;
  onSelectRandom: () => void;
}

export const QuestionUploadDateModal = ({
  isOpen,
  onClose,
  onSelectTomorrow,
  onSelectRandom,
}: QuestionUploadDateModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 flex max-w-[400px] mx-auto bg-black/50 justify-center items-end z-200"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="bg-white w-full rounded-t-2xl p-5"
        >
          {/* 드래그 핸들 */}
          <div className="w-[48px] h-[4px] bg-gray-700 rounded-full mx-auto mb-6" />

          {/* 타이틀 */}
          <div className="text-center T02_B text-gray-900 mb-6">질문 업로드일</div>

          {/* 버튼 목록 */}
          <div className="flex flex-col gap-4 pb-4">
            <button
              onClick={() => {
                onSelectTomorrow();
                onClose();
              }}
              className="w-full h-14 rounded-xl border bg-white text-b7 border-b7 B02_B cursor-pointer"
            >
              내일 업로드하기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
};
