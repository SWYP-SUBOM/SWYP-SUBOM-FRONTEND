import { useModal } from '../../hooks/useModal';
import { CategoryBoxGrid } from './CategoryBox/CategoryBoxGrid';
import { HomeBanner } from './HomeBanner/HomeBanner';

const Home = () => {
  const { isOpen, Content } = useModal();

  /* 오늘의 질문 조회 api 호출*/
  const Questiondata = {
    categoryName: '일상',
    topicName: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden h-full px-4 bg-[#F3F5F8]">
        <div className="flex-none ">
          <HomeBanner />
          <p className="mb-[14px] pt-[26px] B02_B text-gray-800">쓰고싶은 주제를 골라보세요</p>
        </div>
        <div className="flex-1 ">
          <CategoryBoxGrid
            categoryName={Questiondata.categoryName}
            topicName={Questiondata.topicName}
          />
        </div>
      </div>
      {isOpen && Content}
    </>
  );
};

export default Home;
