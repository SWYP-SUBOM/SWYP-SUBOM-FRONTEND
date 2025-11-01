import type { CategoryBoxPropsType } from './CategoryBox.types';

export const CategoryBox = ({
  title,
  titleColor,
  icon,
  size,
  categoryId,
}: CategoryBoxPropsType) => {
  const handleClickBox = () => {
    console.log(categoryId);
  };

  return (
    <div
      onClick={handleClickBox}
      className={`rounded-xl p-4 relative bg-[var(--color-white)] ${size === 'large' ? 'flex-2 min-h-[168px]' : 'flex-1 min-h-[109px]'}
           transition-shadow duration-300
           hover:shadow-[0_0_30px_0_#D0D2D9] active:shadow-[0_0_30px_0_#D0D2D9]`}
    >
      <div className="B02_B" style={{ color: titleColor }}>
        {title}
      </div>
      <img src={icon} className="w-[56px] h-[57px] absolute bottom-4 right-4" />
    </div>
  );
};
