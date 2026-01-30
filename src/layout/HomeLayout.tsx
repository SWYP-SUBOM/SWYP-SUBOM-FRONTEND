import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { NavBar } from './NavBar/NavBar';

interface HomeLayoutProps {
  children?: React.ReactNode;
  showHeaderVar?: boolean;
}

export const HomeLayout = ({ children, showHeaderVar = true }: HomeLayoutProps) => {
  return (
    <div
      className="
        max-w-[400px]
        mx-auto
        bg-[var(--color-white)]
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        min-h-[100dvh]
      "
    >
      {showHeaderVar && <Header />}
      <main
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
