import { useNavigate } from 'react-router-dom';

import { ErrorContent } from './_components/ErrorContent';
import { Button } from '../../components/common/Button';
import close from '../../assets/Error/Delete_icon.svg';

export const TemporaryError = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen">
      <button
        onClick={handleClose}
        className="absolute top-18 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
        aria-label="닫기"
      >
        <img src={close} alt="close" className="w-6 h-6" />
      </button>

      <ErrorContent errorTitle="일시적인 오류입니다" errorMessage="잠시 후에 다시 시도해주세요" />
      <div className="absolute left-0 right-0 top-[550px] md:top-[717px]">
        <Button label="다시 시도" onClick={handleRetry} />
      </div>
    </div>
  );
};
