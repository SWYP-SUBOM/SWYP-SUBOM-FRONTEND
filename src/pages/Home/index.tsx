import { useModal } from '../../hooks/useModal';
import { DailyQuestionModal } from './_components/DailyQuestionModal';

const Home = () => {
  const { isOpen, Content, openModal } = useModal();

  /* 오늘의 질문 조회 api 호출*/
  const data = {
    categoryName: '일상',
    topicName: '아침형 인간과 저녁형 인간 중, 어느 쪽이 더 효율적이라고 생각하시나요?',
  };

  const handleModalOpen = () => {
    openModal(<DailyQuestionModal categoryName={data.categoryName} topicName={data.topicName} />);
  };

  return (
    <>
      <button onClick={handleModalOpen}>modal open</button>
      {isOpen && Content}
    </>
  );
};

export default Home;
