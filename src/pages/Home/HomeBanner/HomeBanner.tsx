import type { homeResponse } from '../../../api/types/home';
import type { namingResponse } from '../../../api/types/user';
import folded from '../../../assets/HomeBanner/folded.svg';
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
  const postStatus = accessToken ? (homeData?.todayPost?.postStatus ?? 'NOT_STARTED') : 'GUEST';
  const streak = homeData?.streak?.current ?? 0;

  const bannerStatus = HomeBannerItem[postStatus];
  const titleContent =
    typeof bannerStatus.title === 'function' ? bannerStatus.title(userName) : bannerStatus.title;

  const descriptionContent =
    typeof bannerStatus.description === 'function'
      ? bannerStatus.description(streak)
      : bannerStatus.description;

  return (
    <div
      className={`
          relative mt-[14px] flex h-[134px] py-[22px] px-4 justify-between rounded-2xl
          ${HomeBannerItem[postStatus].bgColor} 
        `}
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
