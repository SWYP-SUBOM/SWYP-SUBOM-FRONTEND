import { useEffect } from 'react';
import hotright from '../../assets/Home/hotright.svg';
import type { CategoryNameType } from '../../constants/Category';
import { useGetHome } from '../../hooks/Home/useGetHome';
import { useGetPopularPost } from '../../hooks/Post/useGetPopularPost';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useGetUserName } from '../../hooks/User/useGetUserName';
import { useHomeDraftSheetStore } from '../../store/useHomeDraftSheetStore';
import { useTodayPostInfoStore } from '../../store/useTodayPostInfo';
import { GAEvents } from '../../utils/GAEvent';
import { GuideBanner } from './_components/GuideBanner';
import { IsDraftBottomSheet } from './_components/IsDraftBottomSheet';
import { TodayHotPostBox } from './_components/TodayHotPostBox';
import { TopicCarousel } from './Carousel/TopicCarousel';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  const { openBottomSheet, BottomContent } = useBottomSheet();
  const { isDraftSheetOpened, setDraftSheetOpened } = useHomeDraftSheetStore();

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();
  const { data: popularPostData } = useGetPopularPost();
  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);

  const isTodayDraft = homeData?.todayPost?.postStatus === 'DRAFT';
  const draftPostId = homeData?.todayPost?.postId;
  const categoryName = homeData?.todayPost?.categoryName;
  const topicName = homeData?.todayPost?.topicName;
  const categoryId = homeData?.todayPost?.categoryId;
  const topicId = homeData?.todayPost?.topicId;
  const aiFeedbackId = homeData?.todayPost?.aiFeedbackId;
  const topicType = homeData?.todayPost?.topicType;

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
    if (isDraftSheetOpened) return;

    if (
      isTodayDraft &&
      draftPostId &&
      categoryName &&
      topicName &&
      categoryId &&
      topicId &&
      topicType
    ) {
      openBottomSheet(
        <IsDraftBottomSheet
          draftPostId={draftPostId}
          isTodayDraft={isTodayDraft}
          categoryName={categoryName}
          topicName={topicName}
          categoryId={categoryId}
          topicId={topicId}
          aiFeedbackId={aiFeedbackId}
          topicType={topicType}
        />,
      );
      setDraftSheetOpened(true);
    }
  }, [isTodayDraft, draftPostId, openBottomSheet]);

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
          <div className="flex items-center justify-between pt-[30px] mb-1">
            <div className="flex items-center gap-1">
              <p className="T02_B text-gray-900">오늘의 인기 글</p>
              <img src={hotright} className="w-4 h-4 translate-y-1/8" alt="hot-arrow" />
            </div>
          </div>
          <p className="mb-4 pt-1 B03_1_M text-gray-750 pb-1">
            조회수, 반응수에 따라 실시간으로 갱신!
          </p>
          {popularPostData && (
            <TodayHotPostBox
              categoryName={popularPostData?.category.categoryName as CategoryNameType}
              onClick={() => {}}
              nickname={popularPostData?.nickname}
              summary={popularPostData?.summary}
              totalReactions={popularPostData?.totalReactions}
              updatedAt={popularPostData.updatedAt.split('T')[0]}
              postViews={popularPostData?.postViews}
            />
          )}
        </div>
      </div>
      {BottomContent}
    </>
  );
};

export default Home;
