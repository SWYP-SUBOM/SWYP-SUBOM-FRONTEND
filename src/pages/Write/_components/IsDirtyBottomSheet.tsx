import { useNavigate } from 'react-router-dom';
import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';
import { useBottomSheetStore } from '../../../store/useBottomSheetStore';

export const IsDirtyBottomSheet = ({
  handleClickSaveButton,
}: {
  handleClickSaveButton?: (shouldNavigateHome: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheetStore();
  const handleMoveOut = () => {
    navigate('/home');
    closeBottomSheet();
  };

  return (
    <BottomSheet>
      <BottomSheet.Overlay>
        <BottomSheet.Content>
          <Xbutton></Xbutton>
          <BottomSheet.Title>잠깐만요!</BottomSheet.Title>
          <BottomSheet.Description>작성 중인 내용이 사라질 수 있어요</BottomSheet.Description>
          <BottomSheet.Trigger
            leftText="나가기"
            rightText="임시저장"
            onLeftClick={handleMoveOut}
            onRightClick={() => handleClickSaveButton?.(true)}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
