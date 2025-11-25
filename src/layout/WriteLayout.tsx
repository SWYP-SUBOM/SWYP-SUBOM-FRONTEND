import { Outlet, useLocation } from 'react-router-dom';
import { HeaderwithSavePost } from './HeaderwithSavePost';

interface WriteLayoutProps {
  children?: React.ReactNode;
  handleClickSaveButton?: () => void;
  isSaveDisabled?: boolean;
  isDirty?: boolean;
}

export const WriteLayout = ({
  children,
  handleClickSaveButton,
  isSaveDisabled = false,
  isDirty = false,
}: WriteLayoutProps) => {
  const { pathname } = useLocation();
  const isWritePage = pathname === '/write';

  return (
    <div
      className={`
        max-w-[380px]
        mx-auto
        bg-[var(--color-white)]
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        ${isWritePage ? 'app-root overflow-hidden' : 'h-[100vh] min-h-[100dvh] [height:-webkit-fill-available]'}
      `}
    >
      <div className="bg-white">
        <HeaderwithSavePost
          handleClickSaveButton={handleClickSaveButton}
          isSaveDisabled={isSaveDisabled}
          isDirty={isDirty}
        />
      </div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};
