type NavBarTypes = {
  icon: string;
  iconActive: string;
  menuName: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
};

export const NavBarIcon = ({ icon, active, iconActive, menuName, path, onClick }: NavBarTypes) => {
  return (
    <button
      className={`cursor-pointer rounded-[14px] flex flex-col items-center justify-center w-[54px] h-[60px] gap-[6px] ${active ? 'bg-[var(--color-b1)]' : 'bg-[#F9F9F9]'}`}
      onClick={onClick}
    >
      <img className="w-8 h-8" src={active ? iconActive : icon} alt="NavBarIcon" />
      <span className={`${active ? 'text-gray-900' : 'text-[#5A5B66]'} C01_SB`}>{menuName}</span>
    </button>
  );
};
