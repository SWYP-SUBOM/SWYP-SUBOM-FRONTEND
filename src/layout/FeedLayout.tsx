import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';

interface FeedLayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  showNavbar?: boolean;
}

export const FeedLayout = ({ children, header, showNavbar = false }: FeedLayoutProps) => {
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
      {header && <div className="bg-white sticky top-0 z-100">{header}</div>}
      <main>
        {children}
        <Outlet />
      </main>
      {showNavbar && <NavBar />}
    </div>
  );
};
