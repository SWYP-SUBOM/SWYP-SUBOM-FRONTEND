import type { ReactNode } from 'react';
import penFeedback from '../../../assets/Feedback/pen-feedback.png';

type FeedbackBannerProps = {
  children: string | ReactNode;
};

export const FeedbackBanner = ({ children }: FeedbackBannerProps) => {
  return (
    <div className="bg-[var(--color-b2)] px-[10px] pt-1 flex items-center rounded-xl">
      <div>
        <img src={penFeedback} className="w-[70px] h-[70px]" />
      </div>
      <div className="B02_B text-gray-900 ml-3 whitespace-pre-line">{children}</div>
    </div>
  );
};
