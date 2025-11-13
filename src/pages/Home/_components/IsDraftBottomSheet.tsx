import { useNavigate } from 'react-router-dom';
import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';
import { useDeletePost } from '../../../hooks/Post/useDeletePost';

export const IsDraftBottomSheet = ({ postId }: { postId: number }) => {
  const deleteMutation = useDeletePost();
  const navigate = useNavigate();
  const handleResetTodayPost = () => {
    deleteMutation.mutate(
      { postId },
      {
        onSuccess: () => {
          navigate('/home');
          console.log('삭제 완료');
        },
        onError: (error) => console.error('삭제 에러:', error),
      },
    );
  };
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
            onLeftClick={handleResetTodayPost}
            onRightClick={() => console.log('이어쓰기')}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
