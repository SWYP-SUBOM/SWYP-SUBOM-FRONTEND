import bubbleTriangle from '../../../assets/Write/bubble-triangle.svg';
import bubbleXButton from '../../../assets/Write/bubble-xbutton.svg';

type SpeechBubbleType = {
  onBubbleClose: (isOpen: boolean) => void;
  bubbleText: string;
  className?: string;
};

export const SpeechBubble = ({ onBubbleClose, bubbleText, className }: SpeechBubbleType) => {
  const handleCloseBubble = () => {
    onBubbleClose(false);
  };
  return (
    <>
      <div className={`flex flex-col items-end ${className}`}>
        <div className="flex gap-2 items-center bg-[#4D4D4D] px-3 py-2 rounded-lg relative">
          <div className="C01_M text-gray-100">{bubbleText}</div>
          <img
            src={bubbleXButton}
            alt="close"
            onClick={handleCloseBubble}
            className="w-5 h-6 cursor-pointer"
          />
        </div>
        <img
          src={bubbleTriangle}
          alt="triangle"
          className="w-[14px] h-[14px] translate-x-[-14px] translate-y-[-4px]"
        />
      </div>
    </>
  );
};
