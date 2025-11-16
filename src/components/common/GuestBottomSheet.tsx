import { useNavigate } from 'react-router-dom';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { BottomSheet, Xbutton } from '../BottomSheet/BottomSheet';

export const GuestBottomSheet = () => {
  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheet();

  return (
    <BottomSheet>
      <BottomSheet.Overlay>
        <BottomSheet.Content>
          <Xbutton></Xbutton>
          <BottomSheet.Title>로그인 후 이용 가능</BottomSheet.Title>
          <BottomSheet.Description>로그인하여 글쓰기 훈련을 시작해보세요!</BottomSheet.Description>
          <BottomSheet.Trigger
            leftText="나가기"
            rightText="로그인"
            onLeftClick={() => {
              closeBottomSheet();
            }}
            onRightClick={() => {
              closeBottomSheet();
              navigate('/onboarding/Login');
            }}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
