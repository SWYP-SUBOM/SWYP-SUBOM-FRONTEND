import { ScrollToTopButton } from '../../components/common/ScrollTopButton';
import { TitleHeader } from '../../components/common/TitleHeader';
import { FeedLayout } from '../../layout/FeedLayout';
import { GatherTopicTab } from './_components/GatherTopicTab';

export const GatherTopic = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <FeedLayout header={<TitleHeader title="주제 모아보기" headerWithNoalarm />}>
        <div className="px-4">
          <GatherTopicTab />
        </div>
        <ScrollToTopButton />
      </FeedLayout>
    </div>
  );
};
