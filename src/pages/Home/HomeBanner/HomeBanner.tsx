import { useNavigate } from 'react-router-dom';
import type { homeResponse } from '../../../api/types/home';
import type { namingResponse } from '../../../api/types/user';
import folded from '../../../assets/HomeBanner/folded.svg';
import { useTodayPostInfoStore } from '../../../store/useTodayPostInfo';
import { getAccessToken } from '../../../utils/api';
import type { HomeBannerTitleProps } from './HomeBanner.types';
import { HomeBannerItem } from './HomeBannerItem';

export const HomeBannerTitle = ({ children, textColor }: HomeBannerTitleProps) => {
  return <div className={`${textColor} T02_B`}>{children}</div>;
};

export interface HomeBannerProps {
  userNameData: namingResponse['data'] | undefined;
  homeData: homeResponse['data'] | undefined;
}

export const HomeBanner = ({ userNameData, homeData }: HomeBannerProps) => {
  const accessToken = getAccessToken();

  const userName = userNameData ?? '써봄';

  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);
  const todayPostInfo = useTodayPostInfoStore((state) => state.todayPost);

  const todayPost = todayPostInfo?.postId ? todayPostInfo : homeData?.todayPost;

  const postStatus =
    !accessToken || todayPost === null ? 'GUEST' : (todayPost?.postStatus ?? 'NOT_STARTED');

  const streak = homeData?.streak?.current ?? 0;
  const aiFeedbackId = homeData?.todayPost?.aiFeedbackId;

  const bannerStatus = HomeBannerItem[postStatus];
  const titleContent =
    typeof bannerStatus.title === 'function' ? bannerStatus.title(userName) : bannerStatus.title;

  const descriptionContent =
    typeof bannerStatus.description === 'function'
      ? bannerStatus.description(streak)
      : bannerStatus.description;

  const isTodayDraft = homeData?.todayPost?.postStatus === 'DRAFT';

  const navigate = useNavigate();

  const handleBannerClick = () => {
    switch (postStatus) {
      case 'DRAFT':
        if (aiFeedbackId) {
          navigate(
            `/complement/${encodeURIComponent(homeData?.todayPost?.categoryName || '')}/${encodeURIComponent(homeData?.todayPost?.topicName || '')}/${encodeURIComponent(homeData?.todayPost?.topicType || '')}`,
            {
              state: {
                categoryName: homeData?.todayPost?.categoryName,
                topicName: homeData?.todayPost?.topicName,
                topicId: homeData?.todayPost?.topicId,
                categoryId: homeData?.todayPost?.categoryId,
                postId: homeData?.todayPost?.postId,
                aiFeedbackId: aiFeedbackId,
                topicType: homeData?.todayPost?.topicType,
              },
            },
          );
        } else {
          navigate('/write', {
            state: {
              categoryName: homeData?.todayPost?.categoryName,
              topicName: homeData?.todayPost?.topicName,
              topicId: homeData?.todayPost?.topicId,
              categoryId: homeData?.todayPost?.categoryId,
              draftPostId: homeData?.todayPost?.postId,
              isTodayDraft: isTodayDraft,
            },
          });
        }
        break;
      case 'PUBLISHED':
        setTodayPostInfo({ ...todayPost, postStatus: 'PUBLISHED_WITHCLICK' });
        break;
      case 'PUBLISHED_WITHCLICK':
        navigate('/feed');
        break;
      case 'GUEST':
        navigate('/onboarding/Login');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`
          cursor-pointer relative mt-[14px] flex h-[134px] py-[22px] px-4 justify-between rounded-2xl
          ${HomeBannerItem[postStatus].bgColor} 
        `}
      onClick={handleBannerClick}
    >
      <div>
        <div className="flex items-center gap-[10px]">{descriptionContent}</div>
        <div className="mt-[14px]">
          <HomeBannerTitle textColor={bannerStatus.titleTextColor}>
            {titleContent.split('\n').map((line, i) => (
              <div key={i}>
                {line}
                <br />
              </div>
            ))}
          </HomeBannerTitle>
        </div>
      </div>
      <img src={HomeBannerItem[postStatus].img} className="w-[100px] h-[112px]" alt="bannerImg" />
      <div className="absolute right-0 bottom-0">
        <img src={folded} className="w-[26px] h-[26px]" alt="foldedImg" />
      </div>
    </div>
  );
};
