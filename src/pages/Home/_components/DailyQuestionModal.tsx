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

  const todaycategoryId = todayPost?.categoryId;
  const draftPostId = todayPost?.postId;
  const aiFeedbackId = todayPost?.aiFeedbackId;
  const isTodayDraft = todayPost.postStatus === 'DRAFT';

  const { isLoggedIn } = useAuthStore();

  /* 임시저장일때 -> 기존에 임시저장하던 카테고리와 같으면 이어서 쓰고, 다르면 기존 데이터 삭제 후 write페이지로 이동 */
  const onMoveToWrite = async () => {
    closeModal();
    if (isTodayDraft && draftPostId) {
      if (todaycategoryId === categoryId) {
        if (aiFeedbackId && dailyQuestionData) {
          navigate(
            `/complement/${encodeURIComponent(dailyQuestionData?.categoryName)}/${encodeURIComponent(dailyQuestionData?.topicName)}/${encodeURIComponent(dailyQuestionData?.topicType)}`,
            {
              state: {
                categoryName: dailyQuestionData?.categoryName,
                topicName: dailyQuestionData?.topicName,
                topicId: dailyQuestionData?.topicId,
                categoryId: dailyQuestionData?.categoryId,
                postId: draftPostId,
                aiFeedbackId: aiFeedbackId,
              },
            },
          );
        } else {
          navigate('/write', {
            state: {
              categoryName: dailyQuestionData?.categoryName,
              topicName: dailyQuestionData?.topicName,
              topicId: dailyQuestionData?.topicId,
              categoryId: dailyQuestionData?.categoryId,
              draftPostId: draftPostId,
              isTodayDraft: isTodayDraft,
              aiFeedbackId: todayPost.aiFeedbackId,
              topicType: dailyQuestionData?.topicType,
            },
          });
        }
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
              topicType: dailyQuestionData?.topicType,
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
          topicType: dailyQuestionData?.topicType,
        },
      });
    }
  };

  const onMoveLogin = () => {
    closeModal();
    navigate('/onboarding/Login');
  };

  console.log(isLoading);

  return (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Xbutton />
          <Modal.Title> {isLoading ? '오늘의 질문' : dailyQuestionData?.categoryName}</Modal.Title>
          <Modal.Description>
            {isLoading ? '로딩중...' : dailyQuestionData?.topicName}
          </Modal.Description>
          <Modal.Trigger
            isLoading={isLoading}
            handleClickButton={isLoggedIn ? onMoveToWrite : onMoveLogin}
          >
            {isLoggedIn ? '글 쓰러 가기' : '로그인 후 작성하기'}
          </Modal.Trigger>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
};
