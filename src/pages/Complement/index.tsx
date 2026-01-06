import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import type { guideTopicType } from '../../constants/Guide';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { useModal } from '../../hooks/useModal';
import { useVisualViewport } from '../../hooks/useVisualViewport';
import { WriteLayout } from '../../layout/WriteLayout';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { getHighlightedHTML } from '../../utils/HighLights';
import { FeedbackBanner } from '../Feedback/_components/FeedbackBanner';
import { FeedbackBox } from '../Feedback/_components/FeedbackBox';
import { GuideModal } from '../Write/GuideModal/GuideModal';

export const Complement = () => {
  const location = useLocation();
  const { closeBottomSheet } = useBottomSheetStore();
  const { openModal, Content, isOpen } = useModal();
  const { isKeyboardOpen, height, offsetTop } = useVisualViewport();

  const { categoryName, topicName, topicType } = useParams<{
    categoryName: CategoryNameType;
    topicName: string;
    topicType: guideTopicType;
  }>();

  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const isSafari =
    typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const { postId, aiFeedbackId } = location.state as {
    postId: number;
    aiFeedbackId: number;
  };

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(postId, aiFeedbackId);
  const { data: postData } = useGetPost(postId);
  const updateAndSaveMutation = useUpdateAndSavePost();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  if (!categoryName || !topicType) return null;

  const [initialOpinion, setInitialOpinion] = useState('');

  const openGuideModal = (topicType: guideTopicType) => {
    openModal(<GuideModal topicType={topicType} />);
  };

  const [opinion, setOpinion] = useState(initialOpinion);
  useEffect(() => {
    if (postData?.content) {
      setInitialOpinion(postData.content);
      setOpinion(postData.content);
    }
  }, [postData]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(opinion !== initialOpinion);
  }, [opinion, initialOpinion]);

  const isScrolled = useScroll();

  const handleScroll = () => {
    if (textRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

  const highlightTargets =
    AIFeedBackData?.improvementPoints?.map((point) => point.originalText).filter(Boolean) || [];

  const highlightedContent = getHighlightedHTML(opinion, highlightTargets);

  const navigate = useNavigate();
  const handleSaveComplementPost = (shouldNavigateHome = false) => {
    updateAndSaveMutation.mutate(
      { postId, status: 'DRAFT', content: opinion },
      {
        onSuccess: () => {
          setShowSaveAlert(true);
          setTimeout(() => setShowSaveAlert(false), 3000);
          closeBottomSheet();
          setInitialOpinion(opinion);
          setIsDirty(false);
          if (shouldNavigateHome) navigate('/home');
        },
        onError: (error) => console.error('보완하기에서 수정 후 임시저장 에러:', error),
      },
    );
  };

  const handlePublishPost = () => {
    updateAndSaveMutation.mutate(
      { postId, status: 'PUBLISHED', content: opinion },
      {
        onSuccess: () => {
          try {
            navigate('/complete');
          } catch (err) {
            console.error('작성완료 실패:', err);
          }
        },
      },
    );
  };

  return (
    <>
      <WriteLayout
        isRightActions={true}
        handleClickSaveButton={handleSaveComplementPost}
        isDirty={isDirty}
        openGuideModal={() => openGuideModal(topicType)}
        isSaveDisabled={!isDirty}
        showSaveAlert={showSaveAlert}
      >
        <div ref={containerRef} className="relative min-h-[100dvh] bg-[#F3F5F8]">
          <div className="sticky top-0 z-10 px-4 pb-3 pt-[30px] bg-[#F3F5F8]">
            <CategoryChip categoryName={categoryName} />
            <div className="py-[10px] B01_B">{topicName}</div>
          </div>
          <div className="px-4">
            <div className="relative w-full h-[360px] bg-white rounded-xl border border-gray-500 overflow-hidden text-left">
              <div
                ref={highlightRef}
                className="absolute top-0 left-0 w-full h-full B03_M pl-4 pr-2 pt-4 pb-10 pointer-events-none overflow-y-auto whitespace-pre-wrap break-all hide-scrollbar text-gray-800"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightedContent }}
                style={{ lineHeight: '1.5' }}
              />

              <textarea
                ref={textRef}
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                onScroll={handleScroll}
                spellCheck={false}
                className="relative z-10 w-full h-full bg-transparent B03_M pl-4 pr-2 pt-4 pb-10 resize-none focus:outline-none hide-scrollbar"
                style={{
                  lineHeight: '1.5',
                  color: 'transparent',
                  caretColor: '#1F2937',
                }}
              />
              {postData && !isKeyboardOpen && (
                <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
                  {opinion!.length} / 700
                </div>
              )}
            </div>
            {isKeyboardOpen &&
              createPortal(
                <div
                  className="fixed left-0 w-full px-5 flex justify-between items-center bg-white border-t border-gray-200"
                  style={{
                    zIndex: 9999,
                    top: `${height + offsetTop - 50}px`,
                    height: '50px',
                  }}
                >
                  <span className="B03_1_M text-gray-800">현재 글자수</span>
                  <span className="B03_1_M text-gray-750">{opinion.length} / 700</span>
                </div>,
                document.body,
              )}

            <div className="pt-[15px]">
              <FeedbackBanner>써봄이의 피드백을{'\n'}참고해서 수정해보세요!</FeedbackBanner>
            </div>
            <div>
              {AIFeedBackData && !isLoading && (
                <FeedbackBox
                  strength={AIFeedBackData.strength}
                  improvementPoints={AIFeedBackData.improvementPoints}
                />
              )}
            </div>
            <div className="h-[50px]" />
          </div>
          {!(isSafari && isKeyboardOpen) && (
            <div
              className={`sticky bottom-0 left-0 right-0 flex justify-center bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300 ${
                isScrolled ? 'shadow-[0_-10px_50px_0_#D0D2D9]' : 'shadow-none'
              }`}
            >
              <button
                onClick={handlePublishPost}
                className="cursor-pointer rounded-xl max-w-[368px] w-full h-14 bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white rounded-xl B02_B"
              >
                작성 완료
              </button>
            </div>
          )}
        </div>
      </WriteLayout>
      {isOpen && Content}
    </>
  );
};
