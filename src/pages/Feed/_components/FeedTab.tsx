import { Suspense } from 'react';
import { Tabs } from '../../../components/Tabs/UnderlineTab/Tabs';
import { CategoryTabs } from '../../../constants/CategoryMap';
import { GAEvents } from '../../../utils/GAEvent';
import { PostBoxSkeleton } from '../Skeleton/PostBoxSkeleton';
import { TopicBoxSkeleton } from '../Skeleton/TopicBoxSkeleton';
import FeedContent from './FeedContent';

export const FeedTab = () => {
  return (
    <>
      <Tabs>
        <div className="sticky top-[65px] z-100 bg-[var(--color-white)] w-full">
          <Tabs.TabList>
            {CategoryTabs.map((tab) => (
              <Tabs.Trigger
                key={tab.categoryId}
                categoryId={tab.categoryId}
                onClick={() => {
                  GAEvents.feedCategoryClick(tab.categoryId, tab.categoryName);
                }}
              >
                {tab.categoryName}
              </Tabs.Trigger>
            ))}
          </Tabs.TabList>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 overflow-hidden">
          {CategoryTabs.map((tab) => (
            <Tabs.Content key={tab.categoryId} categoryId={tab.categoryId}>
              <Suspense
                fallback={
                  <>
                    <TopicBoxSkeleton />
                    <div className="mx-4 h-6 w-48 bg-gray-300 rounded mt-6 mb-3 animate-pulse"></div>
                    <div className="flex flex-col gap-4 px-4 pb-24">
                      <PostBoxSkeleton />
                      <PostBoxSkeleton />
                    </div>
                  </>
                }
              >
                <FeedContent categoryId={tab.categoryId} />
              </Suspense>
            </Tabs.Content>
          ))}
        </div>
      </Tabs>
    </>
  );
};
