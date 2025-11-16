import { TitleHeader } from '../../components/common/TitleHeader';
import { FeedLayout } from '../../layout/FeedLayout';
import { FeedTab } from './_components/FeedTab';
import { TitleHeader } from '../../components/common/TitleHeader';

export const Feed = () => {
  return (
    <div>
      <FeedLayout showNavbar={true} header={<TitleHeader title="피드" path="feed" />}>
        <FeedTab />
      </FeedLayout>
    </div>
  );
};
