import { useLocation } from 'react-router-dom';
import { NAVBAR_ITEMS } from './NavBar.constant';
import { NavBarIcon } from './NavBarIcon';

export const NavBar = () => {
  const location = useLocation();

  return (
    <div
      className="flex justify-between gap-[30px] px-[17px] items-center absolute bottom-0 w-full py-[10px]
                bg-[#F9F9F9]/80 backdrop-blur-md rounded-xl shadow-[0px_10px_50px_0px_#D0D2D9]"
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
