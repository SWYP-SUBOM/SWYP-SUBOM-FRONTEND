import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';

interface MobileLayoutProps {
  children?: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className={'mobile-layout'}>
      {children}
      <Outlet />
      <NavBar />
    </div>
  );
};
