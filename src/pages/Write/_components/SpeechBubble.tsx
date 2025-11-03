import bubbleTriangle from '../../../assets/Write/bubble-triangle.svg';
import bubbleXButton from '../../../assets/Write/bubble-xbutton.svg';

type SpeechBubbleType = {
  onBubbleClose: (isOpen: boolean) => void;
};

export const SpeechBubble = ({ onBubbleClose }: SpeechBubbleType) => {
  const handleCloseBubble = () => {
    onBubbleClose(false);
  };
  return (
    <>
      <div className="fixed bottom-[80px] left-1/2 -translate-x-[10%] flex flex-col items-end z-50">
        <div className="flex gap-2 bg-[#4D4D4D] px-3 py-2 rounded-lg relative">
          <div className="C01_M text-gray-100 translate-y-1">피드백은 한 번만 가능해요</div>
          <img
            src={bubbleXButton}
            alt="close"
            onClick={handleCloseBubble}
            className="w-5 h-5 cursor-pointer"
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
