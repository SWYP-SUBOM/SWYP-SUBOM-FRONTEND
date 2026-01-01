import { useEffect } from 'react';
import { useGetHome } from '../../hooks/Home/useGetHome';
// import { useNotificationStream } from '../../hooks/Notification/useNotificationStream'; // SSE 관련 코드 주석처리
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useModal } from '../../hooks/useModal';
import { useGetUserName } from '../../hooks/User/useGetUserName';
import { useHomeDraftSheetStore } from '../../store/useHomeDraftSheetStore';
import { useTodayPostInfoStore } from '../../store/useTodayPostInfo';
import { IsDraftBottomSheet } from './_components/IsDraftBottomSheet';
import { CategoryBoxGrid } from './CategoryBox/CategoryBoxGrid';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  const { isOpen, Content } = useModal();
  const { openBottomSheet, BottomContent } = useBottomSheet();
  const { isDraftSheetOpened, setDraftSheetOpened } = useHomeDraftSheetStore();

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();
  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);

  // Home 페이지에 도착했을 때만 SSE 알림 스트림 연결
  // useNotificationStream(); // SSE 관련 코드 주석처리

  const isTodayDraft = homeData?.todayPost?.postStatus === 'DRAFT';
  const draftPostId = homeData?.todayPost?.postId;
  const categoryName = homeData?.todayPost?.categoryName;
  const topicName = homeData?.todayPost?.topicName;
  const categoryId = homeData?.todayPost?.categoryId;
  const topicId = homeData?.todayPost?.topicId;
  const aiFeedbackId = homeData?.todayPost?.aiFeedbackId;
  const topicType = homeData?.todayPost?.topicType;

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
      <div className="flex flex-col overflow-hidden h-full px-4 bg-[#F3F5F8]">
        <div className="flex-none ">
          <HomeBanner userNameData={userNameData} homeData={homeData} />
          <p className="mb-[14px] pt-[26px] B02_B text-gray-800">쓰고싶은 주제를 골라보세요</p>
        </div>
        <div className="flex-1 ">
          <CategoryBoxGrid />
        </div>
      </div>
      {isOpen && Content}
      {BottomContent}
    </>
  );
};

export default Home;
