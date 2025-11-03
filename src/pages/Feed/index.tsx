import { TodayTopicBox } from './_components/TodayTopicBox';

const Feed = () => {
  const topic = {
    topicId: 'uuid-topic-1',
    topicText: '카공에 대해 어떻게 생각하나요?',
    category: {
      categoryId: 'uuid-category-1',
      categoryText: '취미·취향',
    },
  };

  return (
    <>
      <div className="pt-10">
        <TodayTopicBox topicText={topic.topicText} categoryText={topic.category.categoryText} />
      </div>
      <div className="B02_M text-gray-900 pt-6 px-6">다른 사람들은 어떻게 생각할까요?</div>
    </>
  );
};

export default Feed;
