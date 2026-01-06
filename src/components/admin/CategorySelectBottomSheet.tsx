import { AnimatePresence, motion } from 'framer-motion';
import type { CategoryNameType } from '../../constants/Category';
import { CategoryTabs } from '../../constants/CategoryMap';

interface CategorySelectBottomSheetProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
  onClose: () => void;
}

export const CategorySelectBottomSheet = ({
  selectedCategory,
  onSelect,
  onClose,
}: CategorySelectBottomSheetProps) => {
  const categories = ['전체', ...CategoryTabs.map((tab) => tab.categoryName)];

  return (
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
          <div className="w-[48px] h-[4px] bg-gray-300 rounded-full mx-auto mb-6" />

          {/* 타이틀 */}
          <div className="text-center T02_B text-gray-900 mb-6">카테고리</div>

          {/* 카테고리 목록 */}
          <div className="flex flex-col gap-4 pb-4">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <div
                  key={category}
                  onClick={() => {
                    onSelect(category);
                    onClose();
                  }}
                  className="flex items-center justify-between cursor-pointer py-2"
                >
                  <span className="B02_M text-gray-900">{category}</span>
                  {/* 라디오 버튼 */}
                  <div className="relative w-5 h-5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-b7' : 'border-gray-400'
                      }`}
                    >
                      {isSelected && <div className="w-3 h-3 rounded-full bg-b7"></div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
