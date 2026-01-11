import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GuestBottomSheet } from '../../../components/common/GuestBottomSheet';
import { ScrollToTopButton } from '../../../components/common/ScrollTopButton';
import { TitleHeader } from '../../../components/common/TitleHeader';
import { useGetFeed } from '../../../hooks/Feed/useGetFeed';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { FeedLayout } from '../../../layout/FeedLayout';
import { useAuthStore } from '../../../store/useAuthStore';
import { PostBox } from '../_components/PostBox';
import { TopicBox } from '../_components/TopicBox';

export const PastTopic = () => {
  const { topicId, categoryId } = useParams();
  const numericTopicId = topicId ? Number(topicId) : undefined;
  const numericCategoryId = Number(categoryId);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromGather) {
      window.scrollTo(0, 0);
    }
  }, []);

  const { isLoggedIn } = useAuthStore();
  const { openBottomSheet } = useBottomSheet();
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFeed(numericCategoryId, numericTopicId);

  const allPosts = feedData?.pages.flatMap((page) => page.postList) ?? [];
  const categoryName = feedData.pages[0].categoryName;

  const navigate = useNavigate();
  const movetoDetail = (postId: number) => {
    if (isLoggedIn) {
      navigate(`/postdetail/${postId}`);
    } else {
      openBottomSheet(<GuestBottomSheet />);
    }
  };

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin: '300px',
  });

  return (
    <>
      <FeedLayout header={<TitleHeader headerWithPastTopic={true} title={categoryName} />}>
        {feedData && (
          <TopicBox
            topicText={feedData.pages[0].topicName}
            categoryText={feedData.pages[0].categoryName}
            title="과거의 주제"
            ismove={false}
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
          {isFetchingNextPage && (
            <div className="text-center py-4 text-gray-400">불러오는 중...</div>
          )}
        </div>
        <ScrollToTopButton />
      </FeedLayout>
    </>
  );
};

export default PastTopic;
