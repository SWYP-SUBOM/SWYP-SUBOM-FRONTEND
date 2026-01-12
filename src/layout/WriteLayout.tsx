import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import circleCheck from '../assets/Write/circle-check.svg';
import { HeaderwithSavePost } from './HeaderwithSavePost';

import { GAEvents } from '../utils/GAEvent';
interface WriteLayoutProps {
  children?: React.ReactNode;
  handleClickSaveButton?: () => void;
  isRightActions: boolean;
  isSaveDisabled?: boolean;
  isDirty?: boolean;
  openGuideModal?: () => void;
  showSaveAlert?: boolean;
}

export const WriteLayout = ({
  children,
  handleClickSaveButton,
  isRightActions = true,
  isSaveDisabled = false,
  isDirty = false,
  openGuideModal,
  showSaveAlert = false,
}: WriteLayoutProps) => {
  const { pathname } = useLocation();
  const hasSentWriteView = useRef(false);

  useEffect(() => {
    if (pathname === '/write' && !hasSentWriteView.current) {
      GAEvents.writeView();
      hasSentWriteView.current = true;
    }

    if (pathname !== '/write') {
      hasSentWriteView.current = false;
    }
  }, [pathname]);

  const isWritePage = pathname === '/write';

  return (
    <div
      className={`
        max-w-[400px]
        mx-auto
        bg-[var(--color-white)]
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        ${isWritePage ? 'app-root overflow-hidden' : 'h-[100vh] min-h-[100dvh] [height:-webkit-fill-available]'}
      `}
    >
      <div className="bg-white relative z-10 flex flex-col">
        <HeaderwithSavePost
          handleClickSaveButton={handleClickSaveButton}
          isSaveDisabled={isSaveDisabled}
          isDirty={isDirty}
          openGuideModal={openGuideModal}
          isRightActions={isRightActions}
        />
        <div
          className={`flex items-center justify-center bg-[#FDF1D7] overflow-hidden transition-all duration-500 ease-in-out ${
            showSaveAlert ? 'h-[44px] opacity-100' : 'h-0 opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 B03_M text-gray-900 ">
            <img src={circleCheck} alt="circleCheck" className="w-[18px] h-[18px]" />
            <div> 내가 쓴 글 임시저장 완료!</div>
          </div>
        </div>
      </div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};
