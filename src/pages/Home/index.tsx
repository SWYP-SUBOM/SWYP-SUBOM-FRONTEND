import { useEffect } from 'react';
import { useGetHome } from '../../hooks/Home/useGetHome';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useGetUserName } from '../../hooks/useGetUserName';
import { useModal } from '../../hooks/useModal';
import { useTodayPostInfoStore } from '../../store/useTodayPostInfo';
import { IsDraftBottomSheet } from './_components/IsDraftBottomSheet';
import { CategoryBoxGrid } from './CategoryBox/CategoryBoxGrid';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  const { isOpen, Content } = useModal();
  const { openBottomSheet, BottomContent } = useBottomSheet();

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();
  const setTodayPostInfo = useTodayPostInfoStore((state) => state.setTodayPostInfo);

  const isTodayDraft = homeData?.todayPost.postStatus === 'DRAFT';
  const draftPostId = homeData?.todayPost.postId;
  const categoryName = homeData?.todayPost.categoryName;
  const topicName = homeData?.todayPost.topicName;
  const categoryId = homeData?.todayPost.categoryId;
  const topicId = homeData?.todayPost.topicId;
  const aiFeedbackId = homeData?.todayPost.aiFeedbackId;

  if (homeData?.todayPost) {
    setTodayPostInfo(homeData.todayPost);
  }

  useEffect(() => {
    if (isTodayDraft && draftPostId && categoryName && topicName && categoryId && topicId) {
      openBottomSheet(
        <IsDraftBottomSheet
          draftPostId={draftPostId}
          isTodayDraft={isTodayDraft}
          categoryName={categoryName}
          topicName={topicName}
          categoryId={categoryId}
          topicId={topicId}
          aiFeedbackId={aiFeedbackId}
        />,
      );
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
