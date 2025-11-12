import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';
import { WriteLayout } from '../../layout/WriteLayout';
import { SpeechBubble } from './_components/SpeechBubble';

export const Write = () => {
  const location = useLocation();

  const categoryName = location.state.categoryName;
  const topicName = location.state.topicName;

  const [opinion, setOpinion] = useState('');
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const hasClosedBubble = useRef(false);
  const [isDirty, setIsDirty] = useState(false);

  const isWriteOpinion = () => {
    return opinion.trim() !== '';
  };

  const handleSubmit = () => {
    console.log(opinion);
  };

  useEffect(() => {
    if (isWriteOpinion()) {
      setIsDirty(true);
    }
    if (!isWriteOpinion()) {
      setIsDirty(false);
    }
  }, [opinion]);

  useEffect(() => {
    if (isWriteOpinion() && !hasClosedBubble.current) {
      setIsBubbleOpen(true);
    }
  }, [opinion]);

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    hasClosedBubble.current = true;
  };

  const navigate = useNavigate();
  const movetoGetFeedback = () => {
    navigate(`/feedback/${categoryName}/${topicName}`);
  };

  const handleSavePost = () => {
    console.log('임시저장 버튼 누름', opinion);
  };

  return (
    <>
      <WriteLayout handleClickSaveButton={handleSavePost} isDirty={isDirty}>
        <div className="px-4 bg-[#F3F5F8]">
          <div className="pt-[30px] pb-3 flex-shrink-0">
            <CategoryChip categoryName={categoryName}></CategoryChip>
            <div className="py-[10px] B01_B">{topicName}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative w-[328px]">
              <textarea
                placeholder="내 의견을 논리적으로 작성해보세요!"
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                className="B03_M px-4 pt-4 py-10 w-full min-h-[360px] border border-gray-500 rounded-xl resize-none"
              />
              <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
                {opinion.length} / 700
              </div>
            </div>
            <button
              type="submit"
              onClick={movetoGetFeedback}
              disabled={!isWriteOpinion()}
              className={`cursor-pointer rounded-xl max-w-[328px] w-full h-14 B02_B fixed bottom-7 left-1/2 -translate-x-1/2
                ${!isWriteOpinion() ? 'bg-gray-600 text-white' : 'bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white'}`}
            >
              피드백 받기
            </button>
          </form>
          {isBubbleOpen && (
            <SpeechBubble
              className="fixed bottom-[80px] left-1/2 -translate-x-[10%] flex flex-col items-end z-50"
              bubbleText="피드백은 한 번만 가능해요."
              onBubbleClose={handleCloseBubble}
            />
          )}
        </div>
      </WriteLayout>
    </>
  );
};
