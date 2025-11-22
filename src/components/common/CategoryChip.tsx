import type { CategoryNameType } from '../../constants/Category';

export const CategoryChipMap = {
  일상: 'bg-[var(--color-action-blue)]',
  인간관계: 'bg-[var(--color-action-purple)]',
  '시대·사회': 'bg-[var(--color-action-pink)]',
  '문화·트렌드': 'bg-[var(--color-action-green)]',
  가치관: 'bg-[var(--color-action-yellow)]',
};

interface CategoryChipProps {
  categoryName: CategoryNameType;
}

export const CategoryChip = ({ categoryName }: CategoryChipProps) => {
  return (
    <div
      className={`inline-block B03_B rounded-lg px-3 py-[6px] text-white ${CategoryChipMap[categoryName]}`}
    >
      {categoryName}
    </div>
  );
};
