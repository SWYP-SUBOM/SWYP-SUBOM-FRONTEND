import type { CategoryNameType } from '../../constants/Category';
import { CATEGORY_COLOR_MAP } from '../../constants/CategoryMap';

interface CategoryChipProps {
  categoryName: CategoryNameType;
}

export const CategoryChip = ({ categoryName }: CategoryChipProps) => {
  return (
    <div
      className={`inline-block B03_B rounded-lg px-3 py-[6px] text-white ${CATEGORY_COLOR_MAP[categoryName]}`}
    >
      {categoryName}
    </div>
  );
};
