import { Suspense } from 'react';
import { Tabs } from '../../../components/Tabs/UnderlineTab/Tabs';
import { PostBoxSkeleton } from '../Skeleton/PostBoxSkeleton';
import { TodayTopicBoxSkeleton } from '../Skeleton/TodayTopicBoxSkeleton';
import FeedContent from './FeedContent';

export const FeedTab = () => {
  const tabs = [
    { categoryName: '일상', categoryId: 1 },
    { categoryName: '인간관계', categoryId: 2 },
    { categoryName: '문화·트렌드', categoryId: 3 },
    { categoryName: '가치관', categoryId: 4 },
    { categoryName: '취미·취향', categoryId: 5 },
  ];
  return (
    <>
      <Tabs>
        <div className="sticky top-[65px] z-100 bg-[var(--color-white)]">
          <Tabs.TabList>
            {tabs.map((tab) => (
              <Tabs.Trigger key={tab.categoryId} categoryId={tab.categoryId}>
                {tab.categoryName}
              </Tabs.Trigger>
            ))}
          </Tabs.TabList>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 overflow-hidden">
          {tabs.map((tab) => (
            <Tabs.Content key={tab.categoryId} categoryId={tab.categoryId}>
              <Suspense
                fallback={
                  <>
                    <TodayTopicBoxSkeleton />
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
