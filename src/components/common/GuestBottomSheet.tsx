import { useBottomSheet } from '../../hooks/useBottomSheet';
import { BottomSheet, Xbutton } from '../BottomSheet/BottomSheet';
import { kakaoLoginUrl } from '../../api/services/authService';

export const GuestBottomSheet = () => {
  const { closeBottomSheet } = useBottomSheet();
  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl();
  };

  return (
    <BottomSheet>
      <BottomSheet.Overlay>
        <BottomSheet.Content>
          <Xbutton></Xbutton>
          <BottomSheet.Title>로그인 후 이용 가능</BottomSheet.Title>
          <BottomSheet.Description>로그인하여 글쓰기 훈련을 시작해보세요!</BottomSheet.Description>
          <BottomSheet.Trigger  
            loginText="카카오톡으로 1초만에 로그인"
            onLoginClick={() => {
              closeBottomSheet(); 
              handleKakaoLogin();
            }}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
