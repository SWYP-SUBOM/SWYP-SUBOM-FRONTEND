import { useFCM } from '../../hooks/useFCM';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';

export function PushNotificationModal() {
  const { handleRequestPermission } = useFCM();
  const { closeModal } = useModal();

  const handleAllowClick = () => {
    closeModal();

    handleRequestPermission().catch((e) => {
      console.error('푸시 알림 권한 요청 실패:', e);
    });
  };

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Xbutton />
          <Modal.Title>
            매일 글쓰기, 잊지 않도록
            <br />
            알려드릴까요?
          </Modal.Title>
          <Modal.Description>
            푸시 알림을 허용하면 매일
            <br />
            글쓰기 알림을 받을 수 있어요
          </Modal.Description>
          <div className="flex flex-col gap-3">
            <Modal.Trigger handleClickButton={handleAllowClick}>푸시 알림 허용</Modal.Trigger>
            <button onClick={closeModal} className="w-full text-gray-800 B03_M">
              다음에 할래요
            </button>
          </div>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
}
