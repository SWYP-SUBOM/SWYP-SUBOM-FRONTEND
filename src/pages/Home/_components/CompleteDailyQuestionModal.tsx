import { Modal, Xbutton } from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';

export const CompleteDailyQuestionModal = () => {
  const { closeModal } = useModal();
  const movetoHome = () => {
    closeModal();
  };
  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton></Xbutton>
          <Modal.Title>글쓰기를 완료했어요</Modal.Title>
          <Modal.Description>
            이미 글쓰기를 완료했어요 <br />
            내일 다시 만나요!
          </Modal.Description>
          <Modal.Trigger handleClickButton={movetoHome}>알겠어요</Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
