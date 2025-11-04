import { Outlet } from 'react-router-dom';
import { HeaderwithSavePost } from './HeaderwithSavePost';

interface WriteLayoutProps {
  children?: React.ReactNode;
  handleClickSaveButton?: () => void;
  isSaveDisabled?: boolean;
}

export const WriteLayout = ({
  children,
  handleClickSaveButton,
  isSaveDisabled = false,
}: WriteLayoutProps) => {
  return (
    <div
      className="
        max-w-[360px]
        mx-auto
        bg-[var(--color-white)]
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        "
    >
      <div className="bg-white">
        <HeaderwithSavePost
          handleClickSaveButton={handleClickSaveButton}
          isSaveDisabled={isSaveDisabled}
        />
      </div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};
