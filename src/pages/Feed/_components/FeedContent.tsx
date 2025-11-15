import { useNavigate } from 'react-router-dom';
import { useGetFeed } from '../../../hooks/Feed/useGetFeed';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { PostBox } from './PostBox';
import { TodayTopicBox } from './TodayTopicBox';

const FeedContent = ({ categoryId }: { categoryId: number }) => {
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetFeed(categoryId);

  const allPosts = feedData?.pages.flatMap((page) => page.postList) ?? [];

  const navigate = useNavigate();
  const movetoDetail = (postId: number) => {
    navigate(`/postdetail/${postId}`);
  };

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin: '300px',
  });

  console.log('isLoading', isFetching);
  return (
    <>
      {feedData && (
        <TodayTopicBox
          topicText={feedData.pages[0].topicName}
          categoryText={feedData.pages[0].categoryName}
        />
      )}
      <div className="B02_M text-gray-900 pt-6 px-4 pb-3">다른 사람들은 어떻게 생각할까요?</div>
      <div className="px-4 flex flex-col gap-4 pb-24">
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
        <div ref={loadMoreRef} className="h-6" />
        {isFetchingNextPage && <div className="text-center py-4 text-gray-400">불러오는 중...</div>}
      </div>
    </>
  );
};

export default FeedContent;
