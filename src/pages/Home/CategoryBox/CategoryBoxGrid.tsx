import { CategoryBox } from './CategoryBox';
import { CategoryBoxItem } from './CategoryBoxItem';

const CategoryBoxItems = Object.values(CategoryBoxItem);

const largeCategoryBoxes = CategoryBoxItems.filter((item) => item.column === 1);
const smallCategoryBoxes = CategoryBoxItems.filter((item) => item.column === 2);

export const CategoryBoxGrid = () => {
  return (
    <div
      className="flex h-full gap-[7px] flex-1 object-contain"
      style={{ paddingBottom: `calc(90px + env(safe-area-inset-bottom))` }}
    >
      <div className="flex flex-col flex-1 gap-1 justify-between h-full ">
        {largeCategoryBoxes.map((largeCategoryBox) => (
          <CategoryBox
            key={largeCategoryBox.categoryId}
            title={largeCategoryBox.title}
            titleColor={largeCategoryBox.titleColor}
            size={largeCategoryBox.size}
            icon={largeCategoryBox.icon}
            categoryId={largeCategoryBox.categoryId}
          />
        ))}
      </div>
      <div className="flex flex-col flex-1 gap-1 justify-between h-full ">
        {smallCategoryBoxes.map((smallCategoryBox) => (
          <CategoryBox
            key={smallCategoryBox.categoryId}
            title={smallCategoryBox.title}
            titleColor={smallCategoryBox.titleColor}
            size={smallCategoryBox.size}
            icon={smallCategoryBox.icon}
            categoryId={smallCategoryBox.categoryId}
          />
        ))}
      </div>
    </div>
  );
};
