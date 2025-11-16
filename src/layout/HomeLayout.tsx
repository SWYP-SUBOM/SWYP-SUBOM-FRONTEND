import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { NavBar } from './NavBar/NavBar';

interface HomeLayoutProps {
  children?: React.ReactNode;
  showHeaderVar?: boolean;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children, showHeaderVar = true }) => {
  return (
    <div
      className="
        max-w-[380px]
        mx-auto
        app-root
        bg-[var(--color-white)]
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        overflow-hidden
        "
    >
      <div className="bg-[#F3F5F8]">{showHeaderVar && <Header />}</div>
      <main
        className="flex-1 overflow-hidden"
        style={{
          paddingBottom: 'calc(70px + env(safe-area-inset-bottom))',
        }}
      >
        {children}
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};
