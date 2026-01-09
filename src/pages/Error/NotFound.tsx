import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { ErrorContent } from './_components/ErrorContent';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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
      <div className="flex-1 flex items-center justify-center">
        <ErrorContent
          errorTitle="페이지를 찾을 수 없습니다"
          errorMessage={`존재하지 않거나 사용할 수 없는 페이지입니다.\n입력하신 주소가 정확한지 확인해주세요.`}
          errorType="404"
        />
      </div>
      <div className="mt-auto pb-10 w-full mx-auto flex flex-col items-center">
        <Button label="이전 페이지로 이동" onClick={handleGoBack} />
      </div>
    </div>
  );
};
