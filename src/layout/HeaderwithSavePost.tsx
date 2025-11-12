import { useNavigate } from 'react-router-dom';
import left from '../assets/Header/left.svg';
import { useBottomSheet } from '../hooks/useBottomSheet';
import { IsDirtyBottomSheet } from '../pages/Write/_components/IsDirtyBottomSheet';

export type HeaderwithSavePostProps = {
  handleClickSaveButton?: () => void;
  isSaveDisabled?: boolean;
  isDirty?: boolean;
};

export const HeaderwithSavePost = ({
  handleClickSaveButton,
  isSaveDisabled,
  isDirty,
}: HeaderwithSavePostProps) => {
  const navigate = useNavigate();
  const { openBottomSheet, BottomContent } = useBottomSheet();
  const handleBack = () => {
    if (isDirty) {
      openBottomSheet(<IsDirtyBottomSheet />);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full bg-white px-4 pb-[14px] pt-[6px]">
        <button className="cursor-pointer" onClick={handleBack}>
          <img src={left} className="w-9 h-9" />
        </button>
        <div className="B02_B text-gray-900 translate-x-1/4">오늘의 주제</div>
        <button
          onClick={handleClickSaveButton}
          disabled={isSaveDisabled}
          className={`B03_B px-[10px] py-2 rounded-[99px] border cursor-pointer transition
            ${
              isSaveDisabled
                ? 'border-gray-600 text-gray-600 bg-gray-200'
                : 'border-[var(--color-b7)] text-[var(--color-b7)] bg-[var(--color-b1)] hover:opacity-80'
            }`}
        >
          임시저장
        </button>
      </div>
      {BottomContent}
    </>
  );
};
