import { PostBox } from './_components/PostBox';
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

  const items = [
    {
      writingId: 'uuid-1',
      user: {
        userId: 'uuid-user-A',
        nickname: '귀여운 코알라',
      },
      summary: '가장 효율적인 사람은 자신의 몸이 가장 잘 깨어나는 시간을 아는 사람입니다',
      status: 'COMPLETED',
      completedAt: '2025-10-26T10:00:00Z',
      metrics: {
        reactionCount: 12,
        viewCount: 150,
      },
    },

    {
      writingId: 'uuid-1',
      user: {
        userId: 'uuid-user-A',
        nickname: '귀여운 코알라',
      },
      summary: '가장 효율적인 사람은 자신의 몸이 가장 잘 깨어나는 시간을 아는 사람입니다',
      status: 'COMPLETED',
      completedAt: '2025-10-26T10:00:00Z',
      metrics: {
        reactionCount: 12,
        viewCount: 150,
      },
    },
  ];

  return (
    <>
      <div className="pt-10">
        <TodayTopicBox topicText={topic.topicText} categoryText={topic.category.categoryText} />
      </div>
      <div className="B02_M text-gray-900 pt-6 px-4 pb-3">다른 사람들은 어떻게 생각할까요?</div>
      <div className="px-4">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <PostBox
              key={item.writingId}
              nickname={item.user.nickname}
              summary={item.summary}
              heart={item.metrics.reactionCount}
              completedAt={new Date(item.completedAt)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
