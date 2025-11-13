import type { ReactNode } from 'react';

export type HomeBannerTitleProps = {
  children: ReactNode;
  textColor: string;
};

export type HomeBannerStatus =
  | 'NOT_STARTED'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'COMPLETE_WITHCLICK'
  | 'GUEST';

export type HomeBannerItemType = {
  description: ((streak: number) => React.ReactNode) | React.ReactNode;
  title: string | ((username: string) => string);
  img: string;
  bgColor: string;
  titleTextColor: string;
};
