import { useNavigate } from 'react-router-dom';
import { ErrorContent } from './_components/ErrorContent';
import { Button } from '../../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ErrorContent
        errorTitle="페이지를 찾을 수 없습니다"
        errorMessage="존재하지 않거나 사용할 수 없는 페이지입니다. 입력하신 주소가 정확한지 확인해주세요."
      />
      <div className="absolute left-0 right-0 top-[550px] md:top-[717px]">
        <Button label="이전 페이지로 이동" onClick={handleGoBack} />
      </div>
    </>
  );
};
