import { useState } from 'react';
import left from '../../../assets/Calendar/left-before.svg';
import right from '../../../assets/Calendar/right-before.svg';
import leftHover from '../../../assets/Calendar/left-after.svg';
import rightHover from '../../../assets/Calendar/right-after.svg';

type NavigationButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        onClick={onPrev}
        onMouseEnter={() => setIsLeftHovered(true)}
        onMouseLeave={() => setIsLeftHovered(false)}
        onMouseDown={() => setIsLeftActive(true)}
        onMouseUp={() => setIsLeftActive(false)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      >
        <img
          src={isLeftActive || isLeftHovered ? leftHover : left}
          alt="left"
          className="w-6 h-6"
        />
      </button>
      <button
        onClick={onNext}
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
        onMouseDown={() => setIsRightActive(true)}
        onMouseUp={() => setIsRightActive(false)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      >
        <img
          src={isRightActive || isRightHovered ? rightHover : right}
          alt="right"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};
