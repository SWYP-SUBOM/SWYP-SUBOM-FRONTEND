import { Tabs } from '../../../components/Tabs/ButtonTab/Tabs';
import { CategoryTabs } from '../../../constants/CategoryMap';
import { GatherTopicContent } from './GatherTopicContent';

export const GatherTopicTab = () => {
  return (
    <div className="flex flex-col flex-1">
      <Tabs>
        <Tabs.TabList>
          {CategoryTabs.map((tab) => (
            <Tabs.Trigger key={tab.categoryName} categoryId={tab.categoryId}>
              {tab.categoryName}
            </Tabs.Trigger>
          ))}
        </Tabs.TabList>

        <div className="flex-1 overflow-y-auto">
          {CategoryTabs.map((tab) => (
            <Tabs.Content key={tab.categoryName} categoryId={tab.categoryId}>
              <GatherTopicContent categoryId={tab.categoryId} />
            </Tabs.Content>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
