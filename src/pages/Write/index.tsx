import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';

export const Write = () => {
  const location = useLocation();

  const categoryName = location.state.categoryName;
  const topicName = location.state.topicName;

  const [opinion, setOpinion] = useState('');

  const isWriteOpinion = () => {
    return opinion.trim() !== '';
  };

  const handleSubmit = () => {
    console.log(opinion);
  };

  return (
    <>
      <div className="px-4 bg-[#F3F5F8] h-[100dvh]">
        <div className="pt-[30px] pb-3">
          <CategoryChip categoryName={categoryName}></CategoryChip>
          <div className="py-[10px] B01_B">{topicName}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative w-[328px]">
            <textarea
              placeholder="내 의견을 논리적으로 작성해보세요!"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              className="B03_M px-4 pt-4 py-10 w-full h-[360px] border border-gray-500 rounded-xl resize-none"
            />
            <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
              {opinion.length} / 700
            </div>
          </div>
          <button
            type="submit"
            disabled={!isWriteOpinion()}
            className={`cursor-pointer rounded-xl max-w-[328px] w-full h-14 B02_B fixed bottom-7 left-1/2 -translate-x-1/2
                ${!isWriteOpinion() ? 'bg-gray-600 text-white' : 'bg-[var(--color-b8)] text-white'}`}
          >
            피드백 받기
          </button>
        </form>
      </div>
    </>
  );
};
