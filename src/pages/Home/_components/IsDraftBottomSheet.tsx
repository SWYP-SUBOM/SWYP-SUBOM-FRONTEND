import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';

export const IsDraftBottomSheet = () => {
  return (
    <BottomSheet>
      <BottomSheet.Overlay>
        <BottomSheet.Content>
          <Xbutton></Xbutton>
          <BottomSheet.Title>잠깐만요!</BottomSheet.Title>
          <BottomSheet.Description>아직 완성하지 않은 오늘의 글이 있어요</BottomSheet.Description>
          <BottomSheet.Trigger
            leftText="새로 쓰기"
            rightText="이어쓰기"
            onLeftClick={() => console.log('새로 쓰기')}
            onRightClick={() => console.log('이어쓰기')}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
