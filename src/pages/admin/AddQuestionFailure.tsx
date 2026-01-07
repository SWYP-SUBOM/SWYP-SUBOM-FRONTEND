import { useNavigate, useLocation } from 'react-router-dom';
import questionFailed from '../../assets/admin/questionfailed.svg';

export const AddQuestionFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const errorMessage =
    (location.state as { errorMessage?: string })?.errorMessage ||
    '생성된 질문과 중복된 질문이 있어요';

  const handleRegenerate = () => {
    navigate('/admin/add-question');
  };

  const handleGoHome = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pb-32">
      <div className="flex items-center justify-center mb-8">
        <img src={questionFailed} alt="questionFailed" />
      </div>

      <div className="T02_B text-gray-900 mb-2 text-center">질문 생성을 실패했어요</div>
      <div className="B02_M text-gray-750 mb-12 text-center">{errorMessage}</div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 max-w-[400px] w-full px-4 pb-4 pt-3 ">
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRegenerate}
            className="w-full h-14 rounded-xl bg-b7 text-white B02_B cursor-pointer"
          >
            질문 재생성하기
          </button>
          <button
            onClick={handleGoHome}
            className="w-full h-14 rounded-xl border border-b7 bg-white text-b7 B02_B cursor-pointer"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
