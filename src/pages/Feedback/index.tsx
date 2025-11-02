import penFeedback from '../../assets/Feedback/pen-feedback.png';
import pointsToImproveIcon from '../../assets/Feedback/pointsToImprove.svg';
import strengthIcon from '../../assets/Feedback/strength.svg';

export const FeedBack = () => {
  const feedbackData = {
    writingId: 'uuid',
    aiFeedbackId: '1',
    strength: '문장의 도입이 자연스럽고 주제와 잘 연결돼 있어요.',
    pointsToImprove: [
      '주장에 대한 근거가 조금 더 구체적이면 설득력이 높아질 것 같아요.',
      '이 문단은 핵심 내용에 비해 조금 길게 느껴져요. 핵심을 먼저 제시해보는 건 어떨까요?',
    ],
  };

  return (
    <>
      <div className="flex flex-col pt-[30px] px-4">
        <div className="bg-[var(--color-b2)] px-[10px] pt-1 flex items-center rounded-xl">
          <div>
            <img src={penFeedback} className="w-[70px] h-[70px]" />
          </div>
          <div className="B02_B text-gray-900 ml-3">써봄이가 피드백을 준비했어요!</div>
        </div>
        <div className="flex-1 mt-[14px] p-4 border border-[var(--color-b3)] rounded-xl shadow-[0px_0px_30px_0px_#D0D2D9]">
          <div className="flex gap-2">
            <img src={strengthIcon} className="w-6 h-6" />
            <span className="text-[var(--color-b5)] B02_B pb-2">강점</span>
          </div>
          <div>{feedbackData.strength}</div>
          <div className="border-t border-[#E0E4E7] my-4"></div>
          <div className="flex gap-2">
            <img src={pointsToImproveIcon} className="w-6 h-6" />
            <span className="text-[var(--color-b5)] B02_B pb-2">개선 포인트</span>
          </div>
          <div>{feedbackData.pointsToImprove}</div>
          <div className="flex fixed bottom-7 left-1/2 -translate-x-1/2 gap-2 w-[340px]">
            <button className="flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B">
              작성완료
            </button>
            <button className="flex-3 h-14 bg-[var(--color-b7)] text-white rounded-xl B02_B">
              보완하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
