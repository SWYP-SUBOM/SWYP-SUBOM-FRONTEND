import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostBoxSkeleton } from '../Skeleton/PostBoxSkeleton';
import { TodayTopicBoxSkeleton } from '../Skeleton/TodayTopicBoxSkeleton';
import { PostBox } from './PostBox';
import { TodayTopicBox } from './TodayTopicBox';

const FeedContent = ({ categoryId: _categoryId }: { categoryId: number }) => {
  /* categoryName에 해당하는 api 연결*/

  const topic = {
    topicId: 'uuid-topic-1',
    topicText: '카공에 대해 어떻게 생각하나요?',
    category: {
      categoryId: 'uuid-category-1',
      categoryText: '취미·취향',
    },
  };

  const [isLoading] = useState(false);

  const items = [
    {
      postId: 2,
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
      postId: 3,
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

  const navigate = useNavigate();
  const movetoDetail = (postId: number) => {
    navigate(`/postdetail/${postId}`);
  };

  return (
    <>
      {isLoading ? (
        <>
          <TodayTopicBoxSkeleton />
          <div className="mx-4 h-6 w-48 bg-gray-300 rounded mt-6 mb-3 animate-pulse"></div>
          <div className="flex flex-col gap-4 px-4">
            <PostBoxSkeleton />
            <PostBoxSkeleton />
          </div>
        </>
      ) : (
        <>
          <TodayTopicBox topicText={topic.topicText} categoryText={topic.category.categoryText} />
          <div className="B02_M text-gray-900 pt-6 px-4 pb-3">다른 사람들은 어떻게 생각할까요?</div>
          <div className="px-4 flex flex-col gap-4">
            {items.map((item) => (
              <PostBox
                key={item.postId}
                onClick={() => movetoDetail(item.postId)}
                nickname={item.user.nickname}
                summary={item.summary}
                heart={item.metrics.reactionCount}
                completedAt={item.completedAt}
                view={item.metrics.viewCount}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FeedContent;
