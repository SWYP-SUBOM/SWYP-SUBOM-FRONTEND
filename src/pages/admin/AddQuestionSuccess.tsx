import { useNavigate } from 'react-router-dom';
import questionSuccess from '../../assets/admin/questionComplete.svg';

export const AddQuestionSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pb-24">
      <div className=" flex items-center justify-center mb-8">
        <img src={questionSuccess} alt="questionSuccess" />
      </div>

      <div className="T02_B text-gray-900 mb-12 text-center">질문 생성이 완료됐어요</div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 max-w-[400px] w-full px-4 pb-4 pt-3">
        <button
          onClick={handleGoHome}
          className="w-full h-14 rounded-xl bg-b7 text-white B02_B cursor-pointer"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};
