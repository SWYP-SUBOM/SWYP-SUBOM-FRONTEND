import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Modal, Xbutton } from '../../../components/Modal/Modal';
import { useGetDailyQuestion } from '../../../hooks/Home/useGetDailyQuestion';
import { useDeletePost } from '../../../hooks/Post/useDeletePost';
import { useModal } from '../../../hooks/useModal';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTodayPostInfoStore } from '../../../store/useTodayPostInfo';

interface TopicPropsType {
  categoryId: number;
}

export const DailyQuestionModal = ({ categoryId }: TopicPropsType) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const todayPost = useTodayPostInfoStore((state) => state.todayPost);
  const { data: dailyQuestionData, isLoading } = useGetDailyQuestion(categoryId);
  const deleteMutation = useDeletePost();

  const todaycategoryId = todayPost.categoryId;
  const draftPostId = todayPost.postId;
  const isTodayDraft = todayPost.postStatus === 'DRAFT';
  const { isLoggedIn } = useAuthStore();

  /* 임시저장일때 -> 기존에 임시저장하던 카테고리와 같으면 이어서 쓰고, 다르면 기존 데이터 삭제 후 write페이지로 이동 */
  const onMoveToWrite = async () => {
    closeModal();
    if (isTodayDraft && draftPostId) {
      if (todaycategoryId === categoryId) {
        navigate('/write', {
          state: {
            categoryName: dailyQuestionData?.categoryName,
            topicName: dailyQuestionData?.topicName,
            topicId: dailyQuestionData?.topicId,
            categoryId: dailyQuestionData?.categoryId,
            draftPostId: draftPostId,
            isTodayDraft: isTodayDraft,
            aiFeedbackId: todayPost.aiFeedbackId,
          },
        });
      } else {
        try {
          await deleteMutation.mutateAsync({ postId: draftPostId });
          toast.success('삭제 완료');
          navigate('/write', {
            state: {
              categoryName: dailyQuestionData?.categoryName,
              topicName: dailyQuestionData?.topicName,
              topicId: dailyQuestionData?.topicId,
              categoryId: dailyQuestionData?.categoryId,
            },
          });
        } catch (error) {
          console.error('삭제 에러:', error);
        }
      }
    } else {
      navigate('/write', {
        state: {
          categoryName: dailyQuestionData?.categoryName,
          topicName: dailyQuestionData?.topicName,
          topicId: dailyQuestionData?.topicId,
          categoryId: dailyQuestionData?.categoryId,
        },
      });
    }
  };

  const onMoveLogin = () => {
    closeModal();
    navigate('/onboarding/Login');
  };

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton />
          <Modal.Title> {isLoading ? '오늘의 질문' : dailyQuestionData?.categoryName}</Modal.Title>
          <Modal.Description>
            {isLoading ? '로딩중...' : dailyQuestionData?.topicName}
          </Modal.Description>
          <Modal.Trigger handleClickButton={isLoggedIn ? onMoveToWrite : onMoveLogin}>
            {isLoggedIn ? '글 쓰러가기' : '로그인 후 작성하기'}
          </Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
