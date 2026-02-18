import type { CategoryNameType } from '../../../constants/Category';
import { CATEGORY_TAG_COLOR_MAP } from '../../../constants/CategoryMap';

interface CategoryTagProps {
  categoryName: CategoryNameType;
}

export const CategoryTag = ({ categoryName }: CategoryTagProps) => {
  const colors = CATEGORY_TAG_COLOR_MAP[categoryName];

  return (
    <div
      className={`inline-block C01_SB rounded-lg px-[12px] py-[6px] ${colors.bg} ${colors.text}`}
    >
      {categoryName}
    </div>
  );
};
