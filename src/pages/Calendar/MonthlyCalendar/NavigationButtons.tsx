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

  return (
    <div className="flex gap-4">
      <button
        onClick={onPrev}
        onMouseEnter={() => setIsLeftHovered(false)}
        onMouseLeave={() => setIsLeftHovered(true)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      >
        <img src={isLeftHovered ? left : leftHover} alt="left" className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        onMouseEnter={() => setIsRightHovered(false)}
        onMouseLeave={() => setIsRightHovered(true)}
        className="w-8 h-8 rounded-full flex items-center justify-centertransition-colors"
      >
        <img src={isRightHovered ? right : rightHover} alt="right" className="w-6 h-6" />
      </button>
    </div>
  );
};
