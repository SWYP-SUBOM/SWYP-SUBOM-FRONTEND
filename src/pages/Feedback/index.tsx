import { useNavigate, useParams } from 'react-router-dom';
import type { CategoryNameType } from '../../constants/Category';
import { WriteLayout } from '../../layout/WriteLayout';
import { FeedbackBanner } from './_components/FeedbackBanner';
import { FeedbackBox } from './_components/FeedbackBox';

export const FeedBack = () => {
  const feedbackData = {
    writingId: 'uuid',
    aiFeedbackId: '1',
    strength:
      '도입에서 “나는 아침형 인간이 더 효율적이라고 생각한다”라고 명확히 입장을 밝히고, 바로 근거로 이어지는 구조가 좋아요. 개인적 경험(시험 기간의 효율 차이)을 근거로 제시한 점도 진정성을 높여줍니다.',
    pointsToImprove: [
      '1. 논리의 탄탄함 아침형 인간이 ‘효율적’이라고 한 이유가 집중력, 건강, 루틴 등으로 나뉘어 있지만 각각의 인과가 조금 더 구체화되면 좋아요. 예를 들어 “아침에 집중력이 높다” 다음에 왜 그런지 혹은 어떤 상황에서 그런 차이를 느꼈는지를 한두 줄 덧붙이면 설득력이 더 커질 거예요.',
      '2. 흐름/구조 글 후반부에서 “저녁형 생활은 순간적 몰입에는 도움이 될 수 있지만…”으로 넘어갈 때, 비교 전환이 약간 갑작스러워요. 두 유형을 대비하기 전에 “물론 저녁형 인간에게도 장점이 있지만…”처럼 완충 문장을 넣으면 자연스러울 거예요.',
    ],
  };

  const { categoryName, topicName } = useParams<{
    categoryName: CategoryNameType;
    topicName: string;
  }>();

  if (!categoryName) return null;

  const encodedTopicName = encodeURIComponent(topicName!);

  const navigate = useNavigate();
  const movetoComplement = () => {
    navigate(`/complement/${categoryName}/${encodedTopicName}`);
  };

  return (
    <>
      <WriteLayout isSaveDisabled={true}>
        <div className="flex flex-col pt-[30px] min-h-[100dvh] px-4 bg-[#F3F5F8]">
          <FeedbackBanner>써봄이가 피드백을 준비했어요!</FeedbackBanner>
          <div className="flex-1">
            <FeedbackBox
              strength={feedbackData.strength}
              pointsToImprove={feedbackData.pointsToImprove}
            />
            <div className="h-[30px]" />
            <div className="w-[340px] sticky bottom-0 left-0 right-0 flex justify-center gap-2 bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300 ">
              <button className="cursor-pointer flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B">
                작성완료
              </button>
              <button
                onClick={movetoComplement}
                className="cursor-pointer  flex-3 h-14 bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white rounded-xl B02_B"
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
