import { createPortal } from 'react-dom';
import gradeBg from '../../assets/Write/grade-bg.svg';
import { RatingText } from '../../utils/RatingText';

export function Rating({ grade }: { grade: string }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center max-w-[380px] mx-auto bg-[#121212]/70 backdrop-blur-[15px] z-50">
      <div className="relative flex flex-col items-center justify-center max-w-[380px] mx-auto">
        <img src={gradeBg} className="w-38 h-38" alt="gradeBg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-12">
          <div className="text-white B03_B leading-none mb-[2px]">LEVEL</div>
          <div className="text-white text-[54px] font-bold leading-none">{grade}</div>
        </div>
        <div className="mt-6 flex flex-col items-center text-center gap-2">
          <div className="B01_B text-[var(--color-b4)] whitespace-pre-line">
            {RatingText(grade)}
          </div>
          <div className="B03_M text-gray-100">*이 등급은 AI가 채점한 결과입니다</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
