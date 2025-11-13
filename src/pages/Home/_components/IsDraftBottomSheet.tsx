import { useNavigate } from 'react-router-dom';
import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';
import { useDeletePost } from '../../../hooks/Post/useDeletePost';
import { useBottomSheet } from '../../../hooks/useBottomSheet';

export const IsDraftBottomSheet = ({
  draftPostId,
  isTodayDraft,
  categoryName,
  topicName,
  categoryId,
  topicId,
}: {
  draftPostId: number;
  isTodayDraft: boolean;
  categoryName: string;
  topicName: string;
  categoryId: number;
  topicId: number;
}) => {
  const deleteMutation = useDeletePost();
  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheet();
  const handleResetTodayPost = () => {
    closeBottomSheet();
    deleteMutation.mutate(
      { postId: draftPostId },
      {
        onSuccess: () => {
          navigate('/home');
          console.log('삭제 완료');
        },
        onError: (error) => console.error('삭제 에러:', error),
      },
    );
  };

  const handleMoveContinuing = () => {
    closeBottomSheet();
    navigate('/write', {
      state: {
        categoryName: categoryName,
        topicName: topicName,
        topicId: topicId,
        categoryId: categoryId,
        draftPostId: draftPostId,
        isTodayDraft: isTodayDraft,
      },
    });
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
            onRightClick={handleMoveContinuing}
          />
        </BottomSheet.Content>
      </BottomSheet.Overlay>
    </BottomSheet>
  );
};
