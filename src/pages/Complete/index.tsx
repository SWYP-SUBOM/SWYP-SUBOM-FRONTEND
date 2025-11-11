import { useNavigate } from 'react-router-dom';
import penComplete from '../../assets/Write/pen_complete.gif';
import { useGetUserName } from '../../hooks/useGetUserName';

export function Complete() {
  const { data: userName } = useGetUserName();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-[10px] min-h-screen">
      <div className="B03_M text-[var(--color-b7)]">글쓰기 완료!</div>
      <div className="T01_B leading-relaxed">
        <span className="text-[var(--color-b8)]">{userName ?? '써봄'}</span>
        <span className="text-gray-900">님의 사고력이</span>
        <br />
        <span className="text-gray-900">한층 더 성장했어요!</span>
      </div>
      <img src={penComplete} className="w-[211px] h-[217px]" />
      <div className="pt-[76px] flex flex-col gap-3 w-full max-w-[320px]">
        <button
          onClick={() => navigate('/feed')}
          className="cursor-pointer rounded-xl py-[17px] w-full bg-[var(--color-b8)] text-white"
        >
          피드로 이동
        </button>
        <button
          onClick={() => navigate('/calendar')}
          className="cursor-pointer rounded-xl py-[17px] w-full text-[var(--color-b8)] bg-white border border-[var(--color-b8)]"
        >
          내 캘린더로 이동
        </button>
        <button
          onClick={() => navigate('/home')}
          className="cursor-pointer underline B03-1_M text-gray-750"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
