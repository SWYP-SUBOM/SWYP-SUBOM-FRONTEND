import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';
import type { CategoryNameType } from '../../constants/Category';
import { useGetAIFeedBack } from '../../hooks/FeedBack/uesGetAIFeedBack';
import { useGetPost } from '../../hooks/Post/useGetPost';
import { useUpdateAndSavePost } from '../../hooks/Post/useUpdateAndSavePost';
import { WriteLayout } from '../../layout/WriteLayout';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { FeedbackBanner } from '../Feedback/_components/FeedbackBanner';
import { FeedbackBox } from '../Feedback/_components/FeedbackBox';

export const Complement = () => {
  const location = useLocation();
  const { closeBottomSheet } = useBottomSheetStore();
  const { categoryName, topicName } = useParams<{
    categoryName: CategoryNameType;
    topicName: string;
  }>();

  const { postId, aiFeedbackId } = location.state as {
    postId: number;
    aiFeedbackId: number;
  };

  const { data: AIFeedBackData, isLoading } = useGetAIFeedBack(postId, aiFeedbackId);
  const { data: postData } = useGetPost(postId);
  const updateAndSaveMutation = useUpdateAndSavePost();

  if (!categoryName) return null;

  const initialOpinion = postData?.content ?? '';

  const [opinion, setOpinion] = useState(initialOpinion);
  useEffect(() => {
    setOpinion(initialOpinion);
  }, [initialOpinion]);

  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(opinion !== initialOpinion);
  }, [opinion, initialOpinion]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const handleSaveComplementPost = () => {
    updateAndSaveMutation.mutate(
      { postId, status: 'DRAFT', content: opinion },
      {
        onSuccess: () => {
          console.log('보완하기에서 수정 후 임시저장 완료');
          closeBottomSheet();
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
      <WriteLayout handleClickSaveButton={handleSaveComplementPost} isDirty={isDirty}>
        <div ref={containerRef} className="relative min-h-[100dvh] bg-[#F3F5F8]">
          <div className="sticky top-0 z-10 px-4 pb-3 pt-[30px] bg-[#F3F5F8]">
            <CategoryChip categoryName={categoryName} />
            <div className="py-[10px] B01_B">{topicName}</div>
          </div>
          <div className="px-4">
            <div className="relative w-[328px]">
              <textarea
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                className="B03_M px-4 pt-4 py-10 w-full h-[360px] border border-gray-500 rounded-xl resize-none bg-white"
              />
              {postData && (
                <div className="C01_SB absolute bottom-6 right-4 text-gray-700">
                  {opinion!.length} / 700
                </div>
              )}
            </div>
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
          <div
            className={`sticky bottom-0 left-0 right-0 flex justify-center bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300 ${
              isScrolled ? 'shadow-[0_-10px_50px_0_#D0D2D9]' : 'shadow-none'
            }`}
          >
            <div className="flex gap-2 w-[340px]">
              <button
                onClick={handlePublishPost}
                className="cursor-pointer flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B"
              >
                작성완료
              </button>
              <button
                onClick={handlePublishPost}
                className="cursor-pointer flex-3 h-14 bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white rounded-xl B02_B"
              >
                보완하기
              </button>
            </div>
          </div>
        </div>
      </WriteLayout>
    </>
  );
};
