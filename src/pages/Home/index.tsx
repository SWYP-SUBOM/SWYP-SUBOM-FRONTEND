import { Modal, Xbutton } from '../../components/Modal/Modal';

export const MovetoWriteModal = () => {
  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton></Xbutton>
          <Modal.Title>일상</Modal.Title>
          <Modal.Description>
            아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?
          </Modal.Description>
          <Modal.Trigger>글 쓰러가기</Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};

const Home = () => {
  return (
    <>
      <MovetoWriteModal />
    </>
  );
};

export default Home;
