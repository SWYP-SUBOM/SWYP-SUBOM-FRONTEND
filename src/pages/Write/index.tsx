import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import downStep from '../../assets/Write/downstep.svg';
import upStep from '../../assets/Write/upstep.svg';
import { CategoryChip } from '../../components/common/CategoryChip';
import { usePostAIFeedBack } from '../../hooks/FeedBack/usePostAIFeedBack';
import { useGetDraftPost } from '../../hooks/Post/useGetPost';
import { useSavePost } from '../../hooks/Post/useSavePost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { WriteLayout } from '../../layout/WriteLayout';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { Skeleton } from '../Feedback/Skeleton';
import { SpeechBubble } from './_components/SpeechBubble';
import { FeedbackLoading } from './FeedbackLoading';

import { CATEGORIES } from '../../constants/Categories';
import { STEP_MESSAGES } from '../../constants/Guide';
import { GAEvents } from '../../utils/GAEvent';
import { StepIndicator } from './Step/StepIndicator';

export const Write = () => {
  const location = useLocation();
  const { closeBottomSheet } = useBottomSheetStore();

  const MAX_LENGTH = 700;
  const MIN_LENGTH = 100;
  const STEP_DELIMITER = ':::';

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

  const [currentPostId, setCurrentPostId] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contents, setContents] = useState(['', '', '']);
  const [direction, setDirection] = useState(0);

  const saveMutation = useSavePost();
  const updateAndSaveMutation = useUpdateAndSavePost();
  const postAIFeedBackMutation = usePostAIFeedBack();
  const { data: draftPostData } = useGetDraftPost(draftPostId, 'edit', {
    enabled: !!draftPostId && isTodayDraft,
  });

  const currentCategory = CATEGORIES.find((c) => c.name === categoryName) || CATEGORIES[0];
  const currentStepData =
    STEP_MESSAGES[topicType as keyof typeof STEP_MESSAGES] || STEP_MESSAGES.LOGICAL;

  const variants: Variants = {
    initial: (direction: number) => ({
      y: direction === 0 ? 0 : direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: (direction: number) => ({
      y: direction === 0 ? 0 : direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    }),
  };

  const getTotalLength = () => {
    const temp = [...contents];
    temp[step - 1] = opinion;
    return temp.join('').trim().length;
  };

  /* 100자 이상일때 피드백 요청 가능 */
  const isTotalLengthValid = () => {
    return getTotalLength() >= MIN_LENGTH;
  };

  const handleNextStep = () => {
    const newContents = [...contents];
    newContents[step - 1] = opinion;
    setContents(newContents);

    if (step < 3) {
      setDirection(1);
      const nextStep = (step + 1) as 1 | 2 | 3;
      setStep(nextStep);
      setOpinion(newContents[nextStep - 1] || '');
    } else {
      const finalContent = newContents
        .map((content) => content.trim())
        .filter((content) => content.length > 0)
        .join(' ');
      movetoGetFeedback(finalContent);
    }
  };

  const handlePrevStep = () => {
    if (step === 1) return;
    setDirection(-1);
    const newContents = [...contents];
    newContents[step - 1] = opinion;
    setContents(newContents);
    const prevStep = (step - 1) as 1 | 2 | 3;
    setStep(prevStep);
    setOpinion(newContents[prevStep - 1] || '');
  };

  useEffect(() => {
    if (draftPostData && isTodayDraft) {
      const fullContent = draftPostData.content || '';
      const splitContents = fullContent.split(STEP_DELIMITER);

      const newContents = [splitContents[0] || '', splitContents[1] || '', splitContents[2] || ''];

      setContents(newContents);
      setOpinion(newContents[step - 1]);
      setInitialOpinion(fullContent);
      setIsFirst(false);
      setCurrentPostId(draftPostId);
    }
  }, [draftPostData, isTodayDraft]);

  const getUpdatedContents = (currentOpinion: string) => {
    const newContents = [...contents];
    newContents[step - 1] = currentOpinion;
    return newContents;
  };

  useEffect(() => {
    const currentFullContent = getUpdatedContents(opinion).join(STEP_DELIMITER);
    if (draftPostData) {
      setIsDirty(currentFullContent.trim() !== initialOpinion.trim());
    } else {
      setIsDirty(opinion.trim() !== '' || contents.some((c) => c.trim() !== ''));
    }
  }, [opinion, contents, initialOpinion, draftPostData]);

  useEffect(() => {
    if (step === 3 && !isTotalLengthValid() && !hasClosedBubble.current) {
      setIsBubbleOpen(true);
    }
  }, [step, opinion]);

  useEffect(() => {
    if (step === 3) {
      if (!isTotalLengthValid()) {
        if (!hasClosedBubble.current) {
          setIsBubbleOpen(true);
        }
      } else {
        setIsBubbleOpen(false);
      }
    } else {
      setIsBubbleOpen(false);
    }
  }, [step, opinion]);

  const handleCloseBubble = () => {
    setIsBubbleOpen(false);
    hasClosedBubble.current = true;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const otherStepsLength = contents.reduce((sum, content, index) => {
      return index === step - 1 ? sum : sum + content.length;
    }, 0);

    const availableLength = Math.max(0, MAX_LENGTH - otherStepsLength);

    const limitedValue = value.length <= availableLength ? value : value.slice(0, availableLength);

    setOpinion(limitedValue);
    if (!hasWritingStarted.current && limitedValue.trim().length > 0) {
      hasWritingStarted.current = true;
      GAEvents.writingStart(limitedValue.trim());
    }
  };

  const navigate = useNavigate();

  const movetoGetFeedback = (finalContent: string) => {
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

    if (isFirst) {
      saveMutation.mutate(
        { categoryId, topicId, content: finalContent },
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
        { postId: currentPostId, status: 'DRAFT', content: finalContent },
        {
          onSuccess: () => {
            setIsDirty(false);
            saveAndRequestFeedback(currentPostId!);
          },
        },
      );
    }
  };

  const handleSavePost = (shouldNavigateHome = false) => {
    GAEvents.tempSave();
    const currentFullContent = getUpdatedContents(opinion).join(STEP_DELIMITER);
    if (isFirst) {
      saveMutation.mutate(
        { categoryId: categoryId, topicId: topicId, content: currentFullContent },
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
        { postId: currentPostId, status: 'DRAFT', content: currentFullContent },
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

  const isDisabled = step === 3 ? !isTotalLengthValid() : opinion.trim().length < 1;

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
          isRightActions={true}
          showSaveAlert={showSaveAlert}
        >
          <div className="bg-[#F3F5F8] flex flex-col h-[calc(100dvh-50px)] overflow-hidden">
            <div className={`px-[18px] py-[14px] flex-shrink-0 ${currentCategory.bgColor}`}>
              <div className="max-w-[368px] mx-auto w-full">
                <CategoryChip categoryName={categoryName} />
                <div className={`pt-[10px] B03_B ${currentCategory.textColor}`}>{topicName}</div>
              </div>
            </div>
            <div className="px-4 flex-1 flex flex-col overflow-hidden">
              <StepIndicator
                step={step}
                prevText={step > 1 ? contents[step - 2] : ''}
                currentLength={getTotalLength()}
              />
              <div className="flex-1 flex flex-col min-h-0 relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex-1 flex flex-col"
                  >
                    <div className="pt-6">
                      <div className="B01_B text-gray-900">{currentStepData[step].q}</div>
                    </div>
                    <div className="relative pt-4 w-full flex-1 flex flex-col min-h-0 overflow-hidden">
                      <div
                        className="flex-1 pt-[1px]"
                        style={{
                          backgroundImage:
                            'linear-gradient(transparent, transparent calc(14px * 1.6 - 1px), #D1D5DB calc(14px * 1.6 - 1px), #D1D5DB calc(14px * 1.6))',
                          backgroundSize: '100% calc(14px * 1.6)',
                          backgroundRepeat: 'repeat',
                          backgroundAttachment: 'local',
                        }}
                      >
                        <textarea
                          placeholder={currentStepData[step].p}
                          value={opinion}
                          onChange={handleTextChange}
                          className="w-full h-full bg-transparent focus:outline-none B03_M text-gray-800 resize-none hide-scrollbar placeholder:text-blue-500 placeholder:opacity-100 focus:placeholder:text-transparent"
                          style={{
                            lineHeight: 'calc(14px * 1.6)',
                            paddingTop: '0px',
                            marginTop: '0px',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="py-7 pb-[calc(1.75rem+env(safe-area-inset-bottom))] flex-shrink-0 flex justify-center w-full max-w-[368px] mx-auto">
                {step === 1 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={opinion.length < 1}
                    className={`rounded-xl w-full h-14 B02_B text-white transition-colors
          ${opinion.length < 1 ? 'bg-gray-600' : 'bg-b7'}`}
                  >
                    다음
                  </button>
                ) : (
                  <div className="flex w-full gap-2">
                    <button
                      onClick={handlePrevStep}
                      className="flex-[1] h-14 rounded-xl bg-gray-300 flex items-center justify-center transition-colors hover:bg-gray-400"
                    >
                      <div className="flex items-center justify-center">
                        <img src={upStep} className="w-6 h-6" alt="upstep" />
                      </div>
                    </button>

                    <button
                      onClick={handleNextStep}
                      disabled={isDisabled}
                      className={`flex-[5] h-14 rounded-xl B02_B text-white ${isDisabled ? 'bg-gray-600' : 'bg-b7'}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {step !== 3 && (
                          <div className="items-center justify-center">
                            <img src={downStep} className="w-6 h-6" alt="downStep" />
                          </div>
                        )}
                        <span>{step === 3 ? '피드백 받기' : '다음'}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              {isBubbleOpen && (
                <SpeechBubble
                  className="fixed bottom-[70px] left-1/2 -translate-x-5 z-50"
                  bubbleText={
                    <>
                      <span className="text-[var(--color-b4)] ">100자 이상</span> 작성 시 피드백
                      제공
                    </>
                  }
                  onBubbleClose={handleCloseBubble}
                />
              )}
            </div>
          </div>
        </WriteLayout>
      )}
    </>
  );
};
