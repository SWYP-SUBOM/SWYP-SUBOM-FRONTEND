import { useGetHome } from '../../hooks/Home/useGetHome';
import { useGetUserName } from '../../hooks/useGetUserName';
import { useModal } from '../../hooks/useModal';
import { CategoryBoxGrid } from './CategoryBox/CategoryBoxGrid';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  const { isOpen, Content } = useModal();

  const { data: userNameData } = useGetUserName();
  const { data: homeData } = useGetHome();

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
    </>
  );
};

export default Home;
