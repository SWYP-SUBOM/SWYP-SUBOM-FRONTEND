import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BottomSheet, Xbutton } from '../../../components/BottomSheet/BottomSheet';
import { useDeletePost } from '../../../hooks/Post/useDeletePost';
import { useBottomSheet } from '../../../hooks/useBottomSheet';

interface TargetData {
  categoryId: number;
  categoryName: string;
  topicName: string;
  topicId: number;
  aiFeedbackId?: number | null;
  topicType: string;
}

export const IsDraftBottomSheet = ({
  draftPostId,
  isTodayDraft,
  prevData,
  newData,
}: {
  draftPostId: number;
  isTodayDraft: boolean;
  prevData: TargetData;
  newData: TargetData;
}) => {
  const deleteMutation = useDeletePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeBottomSheet } = useBottomSheet();
  const handleResetTodayPost = async () => {
    try {
      await deleteMutation.mutateAsync({ postId: draftPostId });
      toast.success('삭제 완료');
      await queryClient.invalidateQueries({ queryKey: ['home'] });

      navigate('/write', {
        state: {
          categoryId: newData.categoryId,
          categoryName: newData.categoryName,
          topicName: newData.topicName,
          topicId: newData.topicId,
          topicType: newData.topicType,
          isTodayDraft: false,
          showDeleteAlert: true,
        },
      });
    } catch (error) {
      console.error('삭제 에러:', error);
    } finally {
      closeBottomSheet();
    }
  };

  const handleMoveContinuing = () => {
    closeBottomSheet();
    if (prevData.aiFeedbackId) {
      navigate(
        `/complement/${encodeURIComponent(prevData.categoryName)}/${encodeURIComponent(prevData.topicName)}/${encodeURIComponent(prevData.topicType)}`,
        {
          state: {
            ...prevData,
            postId: draftPostId,
            isTodayDraft: isTodayDraft,
          },
        },
      );
    } else {
      navigate('/write', {
        state: {
          ...prevData,
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
