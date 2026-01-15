import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';
import type { guideTopicType } from '../../constants/Guide';
import { usePostAIFeedBack } from '../../hooks/FeedBack/usePostAIFeedBack';
import { useGetDraftPost } from '../../hooks/Post/useGetPost';
import { useSavePost } from '../../hooks/Post/useSavePost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { useModal } from '../../hooks/useModal';
import { useVisualViewport } from '../../hooks/useVisualViewport';
import { WriteLayout } from '../../layout/WriteLayout';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { Skeleton } from '../Feedback/Skeleton';
import { SpeechBubble } from './_components/SpeechBubble';
import { FeedbackLoading } from './FeedbackLoading';
import { GuideModal } from './GuideModal/GuideModal';

import { GAEvents } from '../../utils/GAEvent';

const MAX_LENGTH = 700;

export const Write = () => {
  const location = useLocation();
  const { closeBottomSheet } = useBottomSheetStore();
  const { openModal, Content, isOpen } = useModal();

  const categoryName = location.state.categoryName;
  const categoryId = location.state.categoryId;
  const topicName = location.state.topicName;
  const topicId = location.state.topicId;
  const draftPostId = location.state.draftPostId;
  const isTodayDraft = location.state.isTodayDraft;
  const topicType = location.state.topicType;

  const [opinion, setOpinion] = useState('');
  const [initialOpinion, setInitialOpinion] = useState('');
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const hasClosedBubble = useRef(false);
  const hasWritingStarted = useRef(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const { isKeyboardOpen, height, offsetTop } = useVisualViewport();

  const [currentPostId, setCurrentPostId] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const saveMutation = useSavePost();
  const updateAndSaveMutation = useUpdateAndSavePost();
  const postAIFeedBackMutation = usePostAIFeedBack();
  const { data: draftPostData } = useGetDraftPost(draftPostId, 'edit', {
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

  const isOpinionLengthValid = () => {
    return opinion.trim().length >= 100;
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

  useEffect(() => {
    if (isKeyboardOpen && textRef.current && containerRef.current) {
      setTimeout(() => {
        const textarea = textRef.current;
        if (textarea) {
          textarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          const selectionStart = textarea.selectionStart;
          const textBeforeCursor = textarea.value.substring(0, selectionStart);
          const lines = textBeforeCursor.split('\n');
          const currentLine = lines.length - 1;

          const style = window.getComputedStyle(textarea);
          const lineHeight = parseFloat(style.lineHeight) || 24;
          const paddingTop = parseFloat(style.paddingTop) || 16;

          const cursorTop = currentLine * lineHeight + paddingTop;
          const textareaHeight = textarea.clientHeight;
          const bottomOffset = 70;

          // 커서가 하단 영역에 가려지면 스크롤
          if (cursorTop + lineHeight > textareaHeight - bottomOffset) {
            const targetScrollTop = cursorTop + lineHeight - textareaHeight + bottomOffset;
            textarea.scrollTop = Math.max(0, targetScrollTop);
          }
        }
      }, 100);
    }
  }, [isKeyboardOpen, opinion]);

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    hasClosedBubble.current = true;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const limitedValue = value.length <= MAX_LENGTH ? value : value.slice(0, MAX_LENGTH);

    setOpinion(limitedValue);
    if (!hasWritingStarted.current && limitedValue.trim().length > 0) {
      hasWritingStarted.current = true;
      GAEvents.writingStart(limitedValue.trim());
    }

    if (isKeyboardOpen && textRef.current) {
      requestAnimationFrame(() => {
        const textarea = textRef.current!;
        const textLength = limitedValue.length;
        const lines = limitedValue.split('\n');
        const lineCount = lines.length;

        if (textLength >= 50 || lineCount >= 3) {
          const style = window.getComputedStyle(textarea);
          const lineHeight = parseFloat(style.lineHeight) || 24;
          const paddingTop = parseFloat(style.paddingTop) || 16;

          const selectionStart = textarea.selectionStart;
          const textBeforeCursor = limitedValue.substring(0, selectionStart);
          const currentLine = textBeforeCursor.split('\n').length - 1;

          const cursorTop = currentLine * lineHeight + paddingTop;
          const textareaHeight = textarea.clientHeight;
          const bottomOffset = 70; // 글자수 박스 높이 + 여유 공간

          // 커서가 하단 영역에 가려지면 스크롤
          if (cursorTop + lineHeight > textareaHeight - bottomOffset) {
            const targetScrollTop = cursorTop + lineHeight - textareaHeight + bottomOffset;
            textarea.scrollTop = Math.max(0, targetScrollTop);
          }
        }
      });
    }
  };

  const navigate = useNavigate();
  /* 피드백 받기 요청 보낼때 저장을 안했으면 저장 후 피드백 요청*/
  const movetoGetFeedback = () => {
    GAEvents.aiFeedbackClick();
    setIsLoading(true);
    setShowSkeleton(true);
    const saveAndRequestFeedback = (postId: number) => {
      postAIFeedBackMutation.mutate(postId, {
        onSuccess: (response) => {
          const aiFeedbackId = response.aiFeedbackId;
          navigate(
            `/feedback/${encodeURIComponent(categoryName)}/${encodeURIComponent(topicName)}/${encodeURIComponent(topicType)}`,
            { state: { postId, aiFeedbackId } },
          );
        },
        onError: () => console.log('저장 에러'),
      });
    };

    if (isFirst || isDirty) {
      if (isFirst) {
        saveMutation.mutate(
          { categoryId, topicId, content: opinion },
          {
            onSuccess: (res) => {
              const postId = res.postId;
              setCurrentPostId(postId);
              setIsFirst(false);
              setIsDirty(false);
              saveAndRequestFeedback(postId);
            },
          },
        );
      } else {
        updateAndSaveMutation.mutate(
          { postId: currentPostId, status: 'DRAFT', content: opinion },
          {
            onSuccess: () => {
              setIsDirty(false);
              saveAndRequestFeedback(currentPostId!);
            },
          },
        );
      }
    } else {
      saveAndRequestFeedback(currentPostId!);
    }
  };

  const handleSavePost = (shouldNavigateHome = false) => {
    GAEvents.tempSave();
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
            setShowSaveAlert(true);
            setTimeout(() => setShowSaveAlert(false), 3000);
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
            setShowSaveAlert(true);
            setTimeout(() => setShowSaveAlert(false), 3000);
            closeBottomSheet();
            setIsDirty(false);
            if (shouldNavigateHome) navigate('/home');
          },
          onError: (error) => console.error('수정 후 임시저장 에러:', error),
        },
      );
    }
  };

  const openGuideModal = (topicType: guideTopicType) => {
    GAEvents.writingGuideClick();
    openModal(<GuideModal topicType={topicType} />);
  };

  return (
    <>
      {showSkeleton ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#F3F5F8]">
          <Skeleton />
          {isLoading && <FeedbackLoading />}
        </div>
      ) : (
        <WriteLayout
          handleClickSaveButton={handleSavePost}
          isDirty={isDirty}
          isSaveDisabled={!isDirty}
          openGuideModal={() => openGuideModal(topicType)}
          isRightActions={true}
          showSaveAlert={showSaveAlert}
        >
          <div
            ref={containerRef}
            className="px-4 bg-[#F3F5F8] flex flex-col h-[calc(100dvh-50px)] overflow-hidden"
          >
            <div className="pt-[30px] pb-3 flex-shrink-0">
              <CategoryChip categoryName={categoryName}></CategoryChip>
              <div className="py-[10px] B01_M">{topicName}</div>
            </div>
            <div className="relative w-full flex-1 flex flex-col min-h-0 bg-white border border-gray-400 rounded-xl overflow-hidden">
              <textarea
                ref={textRef}
                placeholder="AI 피드백은 100자 이상 작성 시 제공됩니다."
                value={opinion}
                onChange={handleTextChange}
                maxLength={MAX_LENGTH}
                className="w-full h-[calc(100%-40px)] p-4 hide-scrollbar focus:placeholder-transparent focus:outline-none focus:ring-0 bg-transparent B03_M text-gray-800 resize-none"
              />
              {!isKeyboardOpen && (
                <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-end px-4 bg-white pointer-events-none">
                  <div className="C01_SB text-gray-700">{opinion.length} / 700</div>
                </div>
              )}
            </div>

            {isKeyboardOpen &&
              createPortal(
                <div
                  className="fixed left-0 w-full px-5 flex justify-between items-center bg-white"
                  style={{
                    zIndex: 9999,
                    top: `${height + offsetTop - 50}px`,
                    height: '50px',
                    willChange: 'transform',
                  }}
                >
                  <span className="B03_1_M text-gray-800">현재 글자수</span>
                  <span className="B03_1_M text-gray-750">{opinion.length} / 700</span>
                </div>,
                document.body,
              )}
            {!isKeyboardOpen && (
              <div className="py-7 flex-shrink-0 flex justify-center bg-[#F3F5F8]">
                <button
                  onClick={movetoGetFeedback}
                  disabled={!isOpinionLengthValid()}
                  className={`rounded-xl max-w-[368px] w-full h-14 B02_B transition-colors
                    ${
                      !isOpinionLengthValid()
                        ? 'bg-gray-600 text-white'
                        : 'bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white cursor-pointer'
                    }`}
                >
                  피드백 받기
                </button>
              </div>
            )}
            {isBubbleOpen && (
              <SpeechBubble
                className="fixed bottom-[80px] right-1/2 flex flex-col items-end z-50"
                bubbleText={
                  <>
                    피드백은 <span className="text-[var(--color-b4)] ">한 번</span>만 가능해요
                  </>
                }
                onBubbleClose={handleCloseBubble}
              />
            )}
          </div>
        </WriteLayout>
      )}
      {isOpen && Content}
    </>
  );
};
