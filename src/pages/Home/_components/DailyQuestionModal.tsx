import { useNavigate } from 'react-router-dom';
import { Modal, Xbutton } from '../../../components/Modal/Modal';
import { useGetDailyQuestion } from '../../../hooks/Home/useGetDailyQuestion';
import { useModal } from '../../../hooks/useModal';

interface TopicPropsType {
  categoryId: number;
}

export const DailyQuestionModal = ({ categoryId }: TopicPropsType) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const { data: dailyQuestionData } = useGetDailyQuestion(categoryId);

  const onMoveToWrite = () => {
    closeModal();
    navigate('/write', {
      state: {
        categoryName: dailyQuestionData?.categoryName,
        topicName: dailyQuestionData?.topicName,
      },
    });
  };

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton></Xbutton>
          <Modal.Title>{dailyQuestionData?.categoryName}</Modal.Title>
          <Modal.Description>{dailyQuestionData?.topicName}</Modal.Description>
          <Modal.Trigger handleClickButton={onMoveToWrite}>글 쓰러가기</Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
