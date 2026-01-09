import { useNavigate } from 'react-router-dom';

import close from '../../assets/Error/Delete_icon.svg';
import { ErrorContent } from './_components/ErrorContent';

export const TemporaryError = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    window.location.reload();
  };

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
        px-4
      "
    >
      <button
        onClick={handleClose}
        className="absolute top-5 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
        aria-label="닫기"
      >
        <img src={close} alt="close" className="w-6 h-6" />
      </button>
      <div className="flex-1 flex items-center justify-center">
        <ErrorContent
          errorTitle="일시적인 오류입니다"
          errorMessage="잠시 후에 다시 시도해주세요"
          errorType="500"
        />
      </div>
      <div className="mt-auto pb-10 w-full max-w-[320px] mx-auto flex flex-col gap-3">
        <button
          onClick={handleRetry}
          className="cursor-pointer rounded-xl py-[17px] w-full bg-[var(--color-b8)] text-white"
        >
          다시 시도
        </button>

        <button
          onClick={() => navigate('/home')}
          className="cursor-pointer rounded-xl py-[17px] w-full text-[var(--color-b8)] bg-white border border-[var(--color-b8)]"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};
