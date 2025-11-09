import folded from '../../../assets/HomeBanner/folded.svg';
import { useGetUserName } from '../../../hooks/useGetUserName';
import type { HomeBannerTitleProps } from './HomeBanner.types';
import { HomeBannerItem } from './HomeBannerItem';

export const HomeBannerTitle = ({ children, textColor }: HomeBannerTitleProps) => {
  return <div className={`${textColor} T02_B`}>{children}</div>;
};

export const HomeBanner = () => {
  const { data: userName } = useGetUserName();

  const bannerStatus = HomeBannerItem['NOT_STARTED'];
  const titleContent =
    typeof bannerStatus.title === 'function'
      ? bannerStatus.title(userName ?? '유저')
      : bannerStatus.title;

  return (
    <div
      className={`
          relative mt-[14px] flex h-[134px] py-[22px] px-4 justify-between rounded-2xl
          ${HomeBannerItem['NOT_STARTED'].bgColor} 
        `}
    >
      <div>
        <div className="flex items-center gap-[10px]">
          {HomeBannerItem['NOT_STARTED'].description}
        </div>
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
      <img
        src={HomeBannerItem['NOT_STARTED'].img}
        className="w-[100px] h-[112px]"
        alt="bannerImg"
      />
      <div className="absolute right-0 bottom-0">
        <img src={folded} className="w-[26px] h-[26px]" alt="foldedImg" />
      </div>
    </div>
  );
};
