import { useNavigate } from 'react-router-dom';
import left from '../assets/Header/left.svg';
import saveDisabledIcon from '../assets/Write/save-disabled-icon.svg';
import saveIcon from '../assets/Write/save-icon.svg';
import writeGuide from '../assets/Write/write_guide.svg';
import { useBottomSheet } from '../hooks/useBottomSheet';
import { IsDirtyBottomSheet } from '../pages/Write/_components/IsDirtyBottomSheet';

export type HeaderwithSavePostProps = {
  handleClickSaveButton?: (shouldNavigateHome: boolean) => void;
  isSaveDisabled?: boolean;
  isRightActions?: boolean;
  isDirty?: boolean;
  openGuideModal?: () => void;
};

export const HeaderwithSavePost = ({
  handleClickSaveButton,
  isSaveDisabled,
  isRightActions,
  isDirty,
  openGuideModal,
}: HeaderwithSavePostProps) => {
  const navigate = useNavigate();
  const { openBottomSheet, BottomContent } = useBottomSheet();
  const handleBack = () => {
    if (isDirty) {
      openBottomSheet(<IsDirtyBottomSheet handleClickSaveButton={handleClickSaveButton} />);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-between w-full bg-white px-4 pb-[14px] pt-[6px]">
        <button onClick={handleBack}>
          <img src={left} className="w-9 h-9" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 B02_B text-gray-900">오늘의 주제</div>
        {isRightActions && (
          <div className="flex items-center gap-[6px]">
            <button
              disabled={isSaveDisabled}
              className="w-12 h-12 flex items-center justify-center cursor-pointer"
              onClick={() => handleClickSaveButton?.(false)}
            >
              <img
                src={isSaveDisabled ? saveDisabledIcon : saveIcon}
                className="w-9 h-9"
                alt="saveIcon"
              />
            </button>

            <button
              className="w-12 h-12 flex items-center justify-center cursor-pointer"
              onClick={openGuideModal}
            >
              <img src={writeGuide} className="w-12 h-12" alt="writeguide" />
            </button>
          </div>
        )}
      </div>
      {BottomContent}
    </>
  );
};
