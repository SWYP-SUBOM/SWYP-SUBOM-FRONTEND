import { Tabs } from '../../../components/Tabs/ButtonTab/Tabs';
import { GatherTopicContent } from './GatherTopicContent';

export const GatherTopicTab = () => {
  const tabs = [
    { categoryName: '일상', categoryId: 1 },
    { categoryName: '인간관계', categoryId: 2 },
    { categoryName: '문화·트렌드', categoryId: 3 },
    { categoryName: '가치관', categoryId: 4 },
    { categoryName: '취미·취향', categoryId: 5 },
  ];
  return (
    <Tabs>
      <Tabs.TabList>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.categoryName} categoryId={tab.categoryId}>
            {tab.categoryName}
          </Tabs.Trigger>
        ))}
      </Tabs.TabList>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.categoryName} categoryId={tab.categoryId}>
          <GatherTopicContent categoryId={tab.categoryId} />
        </Tabs.Content>
      ))}
    </Tabs>
  );
};
