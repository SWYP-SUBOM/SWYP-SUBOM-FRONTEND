import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
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
  aiFeedbackId,
}: {
  draftPostId: number;
  isTodayDraft: boolean;
  categoryName: string;
  topicName: string;
  categoryId: number;
  topicId: number;
  aiFeedbackId?: number | null;
}) => {
  const deleteMutation = useDeletePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeBottomSheet } = useBottomSheet();
  const handleResetTodayPost = async () => {
    try {
      await deleteMutation.mutateAsync({ postId: draftPostId });
      toast.success('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['home'] });
      navigate('/home');
    } catch (error) {
      console.error('삭제 에러:', error);
    } finally {
      closeBottomSheet();
    }
  };

  const handleMoveContinuing = () => {
    closeBottomSheet();
    if (aiFeedbackId) {
      navigate(`/complement/${categoryName}/${topicName}`, {
        state: {
          categoryName: categoryName,
          topicName: topicName,
          topicId: topicId,
          categoryId: categoryId,
          postId: draftPostId,
          isTodayDraft: isTodayDraft,
          aiFeedbackId: aiFeedbackId,
        },
      });
    } else {
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
    }
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
