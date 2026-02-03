import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hotright from '../../assets/Home/hotright.svg';
import type { CategoryNameType } from '../../constants/Category';
import { useGetHome } from '../../hooks/Home/useGetHome';
import { useGetPopularPost } from '../../hooks/Post/useGetPopularPost';
import { useGetUserName } from '../../hooks/User/useGetUserName';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useTodayPostInfoStore } from '../../store/useTodayPostInfo';
import { GAEvents } from '../../utils/GAEvent';
import { GuideBanner } from './_components/GuideBanner';
import { TodayHotPostBox } from './_components/TodayHotPostBox';
import { TopicCarousel } from './Carousel/TopicCarousel';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  useThemeColor('#f3f5f8');

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();
  const { data: popularPostData } = useGetPopularPost();
  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);

  const navigate = useNavigate();

  useEffect(() => {
    GAEvents.topicListView();
  }, []);

  useEffect(() => {
    if (!homeData?.todayPost) return;

    const prev = useTodayPostInfoStore.getState().todayPost;

    if (prev?.postStatus === 'PUBLISHED_WITHCLICK') return;

    setTodayPostInfo(homeData.todayPost);
  }, [homeData]);

  return (
    <>
      <div className="flex flex-col bg-[#F3F5F8] pb-6">
        <div className="flex-none px-4">
          <HomeBanner userNameData={userNameData} homeData={homeData} />
          <p className="mb-1 pt-[26px] T02_B text-gray-900">오늘의 주제</p>
          <p className="pt-[2px] B03_1_M text-gray-750 pb-1">히루에 1번 작성할 수 있어요</p>
        </div>

        <TopicCarousel />
        <div className="px-4 pt-[40px]">
          <GuideBanner />
          {popularPostData && (
            <>
              <div className="flex items-center justify-between pt-[30px] mb-1">
                <div className="flex items-center gap-1">
                  <p className="T02_B text-gray-900">오늘의 인기 글</p>
                  <button onClick={() => navigate('/feed')}>
                    <img src={hotright} className="w-4 h-4 translate-y-1/8" alt="hot-arrow" />
                  </button>
                </div>
              </div>
              <p className="mb-4 pt-1 B03_1_M text-gray-750 pb-1">
                조회수, 반응수에 따라 실시간으로 갱신!
              </p>
              <TodayHotPostBox
                categoryName={popularPostData?.category.categoryName as CategoryNameType}
                nickname={popularPostData?.nickname}
                summary={popularPostData?.summary}
                totalReactions={popularPostData?.totalReactions}
                updatedAt={popularPostData.updatedAt.split('T')[0]}
                postViews={popularPostData?.postViews}
                postId={popularPostData?.postId}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
