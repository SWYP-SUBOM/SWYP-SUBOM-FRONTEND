import { useNavigate } from 'react-router-dom';
import culture from '../../../assets/CategoryBox/culture.png';
import daily from '../../../assets/CategoryBox/daily.png';
import hobby from '../../../assets/CategoryBox/hobby.png';
import relationship from '../../../assets/CategoryBox/relationship.png';
import value from '../../../assets/CategoryBox/value.png';
import right from '../../../assets/Feed/right.svg';

export const TodayTopicBoxMap = {
  일상: {
    categoryId: 1,
    title: '일상',
    bgColor: 'bg-[#F2F6FF]',
    icon: daily,
  },
  인간관계: {
    categoryId: 2,
    title: '인간관계',
    bgColor: 'bg-[#FCF2FF]',
    icon: relationship,
  },
  '문화·트렌드': {
    categoryId: 3,
    title: '문화·트렌드',
    bgColor: 'bg-[#F2FFFE]',
    icon: culture,
  },
  가치관: {
    categoryId: 4,
    title: '가치관',
    bgColor: 'bg-[#FFFDF2]',
    icon: value,
  },
  '취미·취향': {
    categoryId: 5,
    title: '취미·취향',
    bgColor: 'bg-[#FFF2F2]',
    icon: hobby,
  },
};

export const TodayTopicBox = ({
  topicText,
  categoryText,
}: {
  topicText: string;
  categoryText: string;
}) => {
  type CategoryKey = keyof typeof TodayTopicBoxMap;
  const categoryData = TodayTopicBoxMap[categoryText as CategoryKey];

  const navigate = useNavigate();
  const movetoGatherTopic = () => {
    navigate('/gathertopic');
  };

  return (
    <>
      <div className={`${categoryData.bgColor} relative w-[380px] h-[270px] px-4 py-7`}>
        <div className="B01_B text-gray-900 pb-3">오늘의 주제</div>
        <div className="B01_B text-gray-800 pb-[23px]">{topicText}</div>
        <img src={categoryData.icon} className="absolute right-5 bottom-5 w-[87px] h-[86px]"></img>
        <div
          className="absolute bottom-5 left-4 flex items-center gap-1 cursor-pointer"
          onClick={movetoGatherTopic}
        >
          <button className="B03-1_M text-gray-750 cursor-pointer">주제 모아보기</button>
          <img src={right} className="w-6 h-6" />
        </div>
      </div>
    </>
  );
};
