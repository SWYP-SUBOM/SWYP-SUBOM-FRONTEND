import { useNavigate } from 'react-router-dom';
import culture from '../../../assets/CategoryBox/culture.png';
import daily from '../../../assets/CategoryBox/daily.png';
import hobby from '../../../assets/CategoryBox/hobby.png';
import relationship from '../../../assets/CategoryBox/relationship.png';
import value from '../../../assets/CategoryBox/value.png';
import right from '../../../assets/Feed/right.svg';
import { useAuthStore } from '../../../store/useAuthStore';

export const TopicBoxMap = {
  일상: {
    categoryId: 1,
    title: '일상',
    bgColor: 'bg-[#F2F6FF]',
    icon: daily,
    iconClass: 'w-[88px] h-[90px]',
  },
  인간관계: {
    categoryId: 2,
    title: '인간관계',
    bgColor: 'bg-[#FCF2FF]',
    icon: relationship,
    iconClass: 'w-[92px] h-[88px]',
  },
  '문화·트렌드': {
    categoryId: 3,
    title: '문화·트렌드',
    bgColor: 'bg-[#F2FFFE]',
    icon: culture,
    iconClass: 'w-[86px] h-[76px]',
  },
  가치관: {
    categoryId: 4,
    title: '가치관',
    bgColor: 'bg-[#FFFDF2]',
    icon: value,
    iconClass: 'w-[85px] h-[81px]',
  },
  '시대·사회': {
    categoryId: 5,
    title: '시대·사회',
    bgColor: 'bg-[#FFF2F2]',
    icon: hobby,
    iconClass: 'w-[107px] h-[115px]',
  },
};

export const TopicBox = ({
  topicText,
  categoryText,
  title,
  ismove,
}: {
  topicText: string;
  categoryText: string;
  title: string;
  ismove?: boolean;
}) => {
  type CategoryKey = keyof typeof TopicBoxMap;
  const categoryData = TopicBoxMap[categoryText as CategoryKey];
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();
  const movetoGatherTopic = () => {
    navigate('/gathertopic');
  };

  return (
    <>
      <div className={`${categoryData.bgColor} relative w-[400px] h-[270px] px-4 py-7`}>
        <div className="B01_B text-gray-900 pb-3">{title}</div>
        <div className="B01_B text-gray-800 pb-[23px]">{topicText}</div>
        <img
          src={categoryData.icon}
          className={`absolute right-5 bottom-5 ${categoryData.iconClass}`}
        ></img>
        {isLoggedIn && ismove && (
          <div
            className="absolute bottom-5 left-4 flex items-center gap-1 cursor-pointer"
            onClick={movetoGatherTopic}
          >
            <div className="flex">
              <button className="B03-1_M text-gray-750 cursor-pointer">주제 모아보기</button>
              <img src={right} className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
