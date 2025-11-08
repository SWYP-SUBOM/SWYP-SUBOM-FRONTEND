import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';

export const IsDirtyBottomSheet = () => {
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
            onLeftClick={() => console.log('나가기')}
            onRightClick={() => console.log('임시저장')}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
