import { createPortal } from 'react-dom';
import penFeedbackLoading from '../../assets/Write/pen-feedback-loading.png';

export const FeedbackLoading = () => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center max-w-[360px] mx-auto">
      <div className="absolute inset-0 bg-[#121212]/70 backdrop-blur-[15px]"></div>
      <div className="relative flex flex-col items-center justify-center text-center gap-2">
        <img src={penFeedbackLoading} className="w-[126px] h-[124px]" />
        <div className="B01_B text-[var(--color-b4)]">써봄이가 피드백을 작성중...</div>
        <div className="B03_M text-gray-100">
          글을 분석하며 피드백을 작성하고 있으니 <br />
          조금만 기다려주세요
        </div>
      </div>
    </div>,
    document.body,
  );
};
