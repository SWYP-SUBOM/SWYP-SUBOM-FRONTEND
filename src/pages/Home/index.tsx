import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hotright from '../../assets/Home/hotright.svg';
import { PushNotificationModal } from '../../components/common/PushNotificationModal';
import type { CategoryNameType } from '../../constants/Category';
import { useGetHome } from '../../hooks/Home/useGetHome';
import { useGetPopularPost } from '../../hooks/Post/useGetPopularPost';
import { useFCM } from '../../hooks/useFCM';
import { useModal } from '../../hooks/useModal';
import { usePWAInfo } from '../../hooks/usePWAInfo';
import { useGetUserName } from '../../hooks/User/useGetUserName';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useAuthStore } from '../../store/useAuthStore';
import { useTodayPostInfoStore } from '../../store/useTodayPostInfo';
import { GAEvents } from '../../utils/GAEvent';
import { GuideBanner } from './_components/GuideBanner';
import { PwaBanner } from './_components/PwaBanner';
import { TodayHotPostBox } from './_components/TodayHotPostBox';
import { TopicCarousel } from './Carousel/TopicCarousel';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  useThemeColor('#f3f5f8');

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();
  const { data: popularPostData } = useGetPopularPost();
  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);
  const { isStandalone, isIOS } = usePWAInfo();
  const { openModal } = useModal();
  const { handleRequestPermission } = useFCM();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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

  useEffect(() => {
    if (!isStandalone || !isLoggedIn) return;

    const currentNativePermission =
      typeof window !== 'undefined' ? Notification.permission : 'default';

    if (currentNativePermission === 'granted' || currentNativePermission === 'denied') {
      return;
    }

    const alreadyAsked = localStorage.getItem('push_permission_asked');
    if (alreadyAsked === 'true') return;

    if (currentNativePermission === 'default') {
      localStorage.setItem('push_permission_asked', 'true');

      if (isIOS) {
        openModal(<PushNotificationModal />);
        localStorage.setItem('push_permission_asked', 'true');
      } else {
        handleRequestPermission()
          .then(() => {
            localStorage.setItem('push_permission_asked', 'true');
          })
          .catch((e) => {
            console.error('푸시 알림 권한 요청 실패:', e);
          });
      }
    }
  }, [isStandalone, isLoggedIn, isIOS, openModal, handleRequestPermission]);

  return (
    <>
      <div className="flex flex-col bg-[#F3F5F8] pb-6">
        <div className="flex-none px-4">
          <HomeBanner userNameData={userNameData} homeData={homeData} />
        </div>
        <TopicCarousel />
        <div className="px-4 pt-[40px]">
          <GuideBanner />
          <PwaBanner />
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
