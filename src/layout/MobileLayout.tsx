import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';
interface MobileLayoutProps {
  children?: React.ReactNode;
  showNavBar?: boolean; // 기본값 true
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, showNavBar = true }) => {
  return (
    <div className={'mobile-layout'}>
      {children}
      <Outlet />
      {showNavBar && <NavBar />}
    </div>
  );
};
