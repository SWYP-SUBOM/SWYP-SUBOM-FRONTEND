import { useEffect } from 'react';
import { TitleHeader } from '../../components/common/TitleHeader';
import { FeedLayout } from '../../layout/FeedLayout';
import { GAEvents } from '../../utils/GAEvent';
import { FeedTab } from './_components/FeedTab';

export const Feed = () => {
  useEffect(() => {
    GAEvents.feedView();

    return () => {
      const currentPath = window.location.pathname;

      const targetPaths = ['/home', '/', '/calendar', '/mypage'];

      if (targetPaths.some((path) => currentPath === path)) {
        GAEvents.feedExit();
      }
    };
  }, []);

  return (
    <div>
      <FeedLayout showNavbar={true} header={<TitleHeader title="피드" path="feed" />}>
        <FeedTab />
      </FeedLayout>
    </div>
  );
};
