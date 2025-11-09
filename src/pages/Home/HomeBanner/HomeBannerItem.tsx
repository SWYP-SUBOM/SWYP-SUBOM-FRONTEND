import penCompleteWithClick from '../../../assets/HomeBanner/pen-complete-withclick.png';
import penComplete from '../../../assets/HomeBanner/pen-complete.png';
import penDraft from '../../../assets/HomeBanner/pen-draft.png';
import penGuest from '../../../assets/HomeBanner/pen-guest.png';
import penNotStarted from '../../../assets/HomeBanner/pen-not-started.png';
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
            <span className="B03_B text-white">{streak}일째</span>
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
  COMPLETE: {
    description: <span className="B03_B text-[#D7ECFF]">내일은 어떤 주제가 나올까? </span>,
    title: '오늘의 글쓰기 완료!',
    titleTextColor: 'text-white',
    img: penComplete,
    bgColor: 'bg-[var(--color-b6)]',
  },
  COMPLETE_WITHCLICK: {
    description: <span className="B03_B text-[#146EFF]">다른 사람들은 어떻게 썼을까? </span>,
    title: '피드 보러가기',
    titleTextColor: 'text-gray-900',
    img: penCompleteWithClick,
    bgColor: 'bg-[var(--color-b2)]',
  },
  GUEST: {
    description: <span className="B03_B text-[#D7ECFF]">로그인 후 이용 가능</span>,
    title: '로그인하고 \n 루틴 시작하기',
    titleTextColor: 'text-white',
    img: penGuest,
    bgColor: 'bg-[var(--color-b5)]',
  },
};
