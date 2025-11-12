import { Tabs } from '../../../components/Tabs/UnderlineTab/Tabs';
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
    <Tabs>
      <Tabs.TabList>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.categoryId} categoryId={tab.categoryId}>
            {tab.categoryName}
          </Tabs.Trigger>
        ))}
      </Tabs.TabList>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.categoryId} categoryId={tab.categoryId}>
          <FeedContent categoryId={tab.categoryId} />
        </Tabs.Content>
      ))}
    </Tabs>
  );
};
