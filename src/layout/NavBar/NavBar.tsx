import { useLocation } from 'react-router-dom';
import { NAVBAR_ITEMS } from './NavBar.constant';
import { NavBarIcon } from './NavBarIcon';

export const NavBar = () => {
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-between items-center gap-8 max-w-[360px] w-full
       py-2.5 bg-[#F9F9F9]/80 backdrop-blur-md rounded-xl shadow-[0px_10px_50px_0px_#D0D2D9] px-[17px]"
      style={{ paddingBottom: `calc(10px + env(safe-area-inset-bottom))` }}
    >
      {NAVBAR_ITEMS.map((item) => (
        <NavBarIcon
          key={item.path}
          menuName={item.menuName}
          icon={item.icon}
          iconActive={item.iconActive}
          path={item.path}
          active={location.pathname === item.path}
        />
      ))}
    </div>
  );
};
