import { kakaoLoginUrl } from '../../api/services/authService';
import write from '../../assets/BottomSheet/write.svg';
import type { CategoryNameType } from '../../constants/Category';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { BottomSheet, Xbutton } from '../BottomSheet/BottomSheet';

export interface pendingDataProps {
  categoryId: number;
  categoryName: CategoryNameType;
  topicName: string;
  topicId: number;
  topicType: string;
  isTodayDraft: boolean;
}

export const GuestBottomSheet = ({ pendingData }: { pendingData: pendingDataProps }) => {
  const { closeBottomSheet } = useBottomSheet();
  const handleKakaoLogin = () => {
    if (pendingData) {
      localStorage.setItem('pending_post_data', JSON.stringify(pendingData));
    }
    window.location.href = kakaoLoginUrl();
  };

  return (
    <BottomSheet>
      <BottomSheet.Overlay>
        <BottomSheet.Content height={382} icon={write} iconSize={52}>
          <Xbutton></Xbutton>
          <BottomSheet.Title>
            무료로 내 글쓰기 실력을 <br /> 점검해보세요
          </BottomSheet.Title>
          <BottomSheet.Description>
            AI가 문장력과 글의 흐름을 분석해
            <br /> 점수와 개선 포인트를 알려드려요.
          </BottomSheet.Description>
          <BottomSheet.Trigger
            loginText="3초만에 로그인하기"
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
