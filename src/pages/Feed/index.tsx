import { FeedTab } from './_components/FeedTab';
import { TitleHeader } from '../../components/common/TitleHeader';

export const Feed = () => {
  return (
    <div className="pt-10">
      <TitleHeader title="피드" showDateHeader={true} />
      <FeedTab />
    </div>
  );
};
