import type { CategoryNameType } from '../../constants/Category';

export const CategoryChipMap = {
  일상: 'bg-[var(--color-action-blue)]',
  인간관계: 'bg-[var(--color-action-purple)]',
  '취미·취향': 'bg-[var(--color-action-pink)]',
  '문화·트렌드': 'bg-[var(--color-action-green)]',
  가치관: 'bg-[var(--color-action-yellow)]',
};

interface CategoryChipProps {
  categoryName: CategoryNameType;
}

export const CategoryChip = ({ categoryName }: CategoryChipProps) => {
  return (
    <div
      className={`w-[49px] B03_B rounded-lg px-3 py-[6px] text-white ${CategoryChipMap[categoryName]}`}
    >
      {categoryName}
    </div>
  );
};
