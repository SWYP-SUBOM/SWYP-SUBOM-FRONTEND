import { useNavigate } from 'react-router-dom';
import { Modal, Xbutton } from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';

interface TopicPropsType {
  categoryName: string;
  topicName: string;
}

export const DailyQuestionModal = ({ categoryName, topicName }: TopicPropsType) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const onMoveToWrite = () => {
    closeModal();
    navigate('/write', { state: { categoryName: categoryName, topicName: topicName } });
  };

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton></Xbutton>
          <Modal.Title>{categoryName}</Modal.Title>
          <Modal.Description>{topicName}</Modal.Description>
          <Modal.Trigger handleClickButton={onMoveToWrite}>글 쓰러가기</Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
