import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { NavBar } from './NavBar/NavBar';
interface MobileLayoutProps {
  children?: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className={'mobile-layout'}>
      <div className="pt-[14px] bg-[#F3F5F8]">{<Header />}</div>
      {children}
      <Outlet />
      <NavBar />
    </div>
  );
};
