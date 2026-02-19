import penCompleteWithClick from '../../../assets/HomeBanner/pen-complete-withclick.webp';
import penComplete from '../../../assets/HomeBanner/pen-complete.webp';
import penDraft from '../../../assets/HomeBanner/pen-draft.webp';
import penNotStarted from '../../../assets/HomeBanner/pen-not-started.webp';
import type {
  HomeBannerItemType,
  HomeBannerStatus,
  HomeBannerTitleProps,
} from './HomeBanner.types';

export const HomeBannerTitle = ({ children, textColor }: HomeBannerTitleProps) => {
  return <div className={`${textColor} T02_B`}>{children}</div>;
};

export const HomeBannerItem: Record<HomeBannerStatus, HomeBannerItemType> = {
  NOT_STARTED: {
    description: (streak: number) => (
      <>
        <div className="flex items-center gap-1">
          <div className="w-[50px] h-[26px] flex items-center justify-center bg-[#146EFF] px-2 py-1 rounded-[20px]">
            <span className="B03_B text-white whitespace-nowrap">{streak}일째</span>
          </div>
          <span className="B03_B text-[#146EFF]">꾸준히 진행 중 </span>
        </div>
      </>
    ),
    title: (username: string) => `반가워요, ${username}님\n오늘도 써볼까요?`,
    titleTextColor: 'text-gray-900',
    img: penNotStarted,
    bgColor: 'bg-[var(--color-b2)]',
  },
  DRAFT: {
    description: <span className="B03_B text-[#146EFF]">아직 작성 중인 글이 있어요 </span>,
    title: '이어쓰러가기',
    titleTextColor: 'text-gray-900',
    img: penDraft,
    bgColor: 'bg-[var(--color-b3)]',
  },
  PUBLISHED: {
    description: <span className="B03_B text-[#D7ECFF]">내일은 어떤 주제가 나올까? </span>,
    title: '오늘의 글쓰기 완료!',
    titleTextColor: 'text-white',
    img: penComplete,
    bgColor: 'bg-[var(--color-b6)]',
  },
  PUBLISHED_WITHCLICK: {
    description: <span className="B03_B text-[#146EFF]">다른 사람들은 어떻게 썼을까? </span>,
    title: '피드 보러가기',
    titleTextColor: 'text-gray-900',
    img: penCompleteWithClick,
    bgColor: 'bg-[var(--color-b2)]',
  },
  GUEST: {
    description: <span className="B03_B text-[#2276FF]">하루에 한 글로 사고력 훈련</span>,
    title: '나의 사고력 레벨은? \n 지금 바로 글 써보기',
    titleTextColor: 'text-gray-900',
    img: penNotStarted,
    bgColor: 'bg-[var(--color-b2)]',
  },
};
