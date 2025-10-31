import { CategoryBoxGrid } from './CategoryBox/CategoryBoxGrid';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  return (
    <div className="flex flex-col px-4 pb-[63px] bg-[#F3F5F8]">
      <div className="flex-none ">
        <HomeBanner />
        <p className="mb-[14px] pt-[26px] B02_B text-gray-800">쓰고싶은 주제를 골라보세요</p>
      </div>
      <CategoryBoxGrid />
    </div>
  );
};

export default Home;
