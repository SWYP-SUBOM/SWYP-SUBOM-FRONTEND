import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';
import { usePostAIFeedBack } from '../../hooks/FeedBack/usePostAIFeedBack';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { useSavePost } from '../../hooks/Post/useSavePost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { WriteLayout } from '../../layout/WriteLayout';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { SpeechBubble } from './_components/SpeechBubble';
import { FeedbackLoading } from './FeedbackLoading';

export const Write = () => {
  const location = useLocation();
  const { closeBottomSheet } = useBottomSheetStore();

  const categoryName = location.state.categoryName;
  const categoryId = location.state.categoryId;
  const topicName = location.state.topicName;
  const topicId = location.state.topicId;
  const draftPostId = location.state.draftPostId;
  const isTodayDraft = location.state.isTodayDraft;

  const [opinion, setOpinion] = useState('');
  const [initialOpinion, setInitialOpinion] = useState('');
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const hasClosedBubble = useRef(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPostId, setCurrentPostId] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  const saveMutation = useSavePost();
  const updateAndSaveMutation = useUpdateAndSavePost();
  const postAIFeedBackMutation = usePostAIFeedBack();
  const { data: draftPostData } = useGetPost(draftPostId, 'edit', {
    enabled: !!draftPostId && isTodayDraft,
  });

  useEffect(() => {
    if (draftPostData && isTodayDraft) {
      setOpinion(draftPostData.content);
      setInitialOpinion(draftPostData.content);
      setIsFirst(false);
      setCurrentPostId(draftPostId);
    }
  }, [draftPostData, isTodayDraft]);

  const isWriteOpinion = () => {
    return opinion.trim() !== '';
  };

  useEffect(() => {
    if (draftPostData) {
      const hasChanged = opinion.trim() !== initialOpinion.trim();
      setIsDirty(hasChanged);
    } else {
      setIsDirty(isWriteOpinion());
    }
  }, [opinion, initialOpinion, draftPostData]);

  useEffect(() => {
    if (isWriteOpinion() && !hasClosedBubble.current) {
      setIsBubbleOpen(true);
    }
  }, [opinion]);

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    hasClosedBubble.current = true;
  };

  const navigate = useNavigate();

  const movetoGetFeedback = () => {
    setIsLoading(true);
    postAIFeedBackMutation.mutate(currentPostId, {
      onSuccess: (response) => {
        const aiFeedbackId = response.aiFeedbackId;
        try {
          navigate(
            `/feedback/${encodeURIComponent(categoryName)}/${encodeURIComponent(topicName)}`,
            {
              state: { postId: currentPostId, aiFeedbackId },
            },
          );
        } catch (err) {
          console.error('AI 피드백 요청 실패:', err);
        }
      },
      onError: (error: Error) => {
        console.error('AI 피드백 요청 에러:', error);
        setIsLoading(false);
      },
    });
  };

  const handleSavePost = (shouldNavigateHome = false) => {
    if (isFirst) {
      saveMutation.mutate(
        { categoryId: categoryId, topicId: topicId, content: opinion },
        {
          onSuccess: (response) => {
            const postId = response.postId;
            setCurrentPostId(postId);
            setIsFirst(false);
            setIsDirty(false);
            closeBottomSheet();
            if (shouldNavigateHome) navigate('/home');
          },
          onError: (error: Error) => {
            console.error('임시저장 에러:', error);
          },
        },
      );
    } else {
      updateAndSaveMutation.mutate(
        { postId: currentPostId, status: 'DRAFT', content: opinion },
        {
          onSuccess: () => {
            console.log('수정 후 임시저장 완료');
            closeBottomSheet();
            setIsDirty(false);
            console.log(shouldNavigateHome);
            if (shouldNavigateHome) navigate('/home');
          },
          onError: (error) => console.error('수정 후 임시저장 에러:', error),
        },
      );
    }
  };

  return (
    <>
      <WriteLayout handleClickSaveButton={handleSavePost} isDirty={isDirty}>
        <div className="px-4 bg-[#F3F5F8]">
          <div className="pt-[30px] pb-3 flex-shrink-0">
            <CategoryChip categoryName={categoryName}></CategoryChip>
            <div className="py-[10px] B01_B">{topicName}</div>
          </div>
          <div className="relative w-[328px]">
            <textarea
              placeholder="내 의견을 논리적으로 작성해보세요!"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              className="B03_M px-4 pt-4 py-10 w-full min-h-[360px] border border-gray-500 rounded-xl resize-none"
            />
            <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
              {opinion.length} / 700
            </div>
          </div>
          <button
            onClick={movetoGetFeedback}
            disabled={!isWriteOpinion()}
            className={`cursor-pointer rounded-xl max-w-[328px] w-full h-14 B02_B fixed bottom-7 left-1/2 -translate-x-1/2
                ${!isWriteOpinion() ? 'bg-gray-600 text-white' : 'bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white'}`}
          >
            피드백 받기
          </button>
          {isBubbleOpen && (
            <SpeechBubble
              className="fixed bottom-[80px] left-1/2 -translate-x-[10%] flex flex-col items-end z-50"
              bubbleText="피드백은 한 번만 가능해요."
              onBubbleClose={handleCloseBubble}
            />
          )}
        </div>
      </WriteLayout>
      {isLoading && <FeedbackLoading />}
    </>
  );
};
