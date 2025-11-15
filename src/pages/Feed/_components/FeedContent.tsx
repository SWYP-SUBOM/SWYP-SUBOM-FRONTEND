import { useNavigate } from 'react-router-dom';
import { useGetFeed } from '../../../hooks/Feed/useGetFeed';
import { PostBoxSkeleton } from '../Skeleton/PostBoxSkeleton';
import { TodayTopicBoxSkeleton } from '../Skeleton/TodayTopicBoxSkeleton';
import { PostBox } from './PostBox';
import { TodayTopicBox } from './TodayTopicBox';

const FeedContent = ({ categoryId }: { categoryId: number }) => {
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetFeed(categoryId);

  const allPosts = feedData?.pages.flatMap((page) => page.postList) ?? [];

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
          {feedData && (
            <TodayTopicBox
              topicText={feedData.pages[0].topicName}
              categoryText={feedData.pages[0].categoryName}
            />
          )}
          <div className="B02_M text-gray-900 pt-6 px-4 pb-3">다른 사람들은 어떻게 생각할까요?</div>
          <div className="px-4 flex flex-col gap-4">
            {allPosts.map((post) => (
              <PostBox
                key={post.postId}
                onClick={() => movetoDetail(post.postId)}
                nickname={post.nickname}
                summary={post.summary}
                heart={post.totalReactions}
                completedAt={post.updatedAt}
                view={post.postViews}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FeedContent;
