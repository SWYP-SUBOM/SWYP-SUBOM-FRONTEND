import { useNavigate } from 'react-router-dom';
import alarm_black from '../../assets/Header/alarm.svg';
import alarm_white from '../../assets/Header/alarm_white.svg';
import left from '../../assets/Header/left.svg';

interface TitleHeaderProps {
  headerWithNoalarm?: boolean;
  title?: string;
  onBack?: () => void;
  path?: string;
  onlyNavigateBack?: boolean;
}

export const TitleHeader = ({
  headerWithNoalarm = false,
  title,
  onBack,
  path,
  onlyNavigateBack = false,
}: TitleHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const isFeed = path === 'feed';

  if (headerWithNoalarm) {
    return (
      <div className="flex items-center justify-between w-full px-4 mt-2.5 mb-10">
        <button className="cursor-pointer" onClick={handleBack}>
          <img src={left} className="w-9 h-9" alt="뒤로가기" />
        </button>
        <div className="B02_B text-gray-900">{title}</div>
        <div className="w-6" />
      </div>
    );
  }

  if (onlyNavigateBack) {
    return (
      <div className="flex items-center justify-between w-full px-4 mt-2.5 mb-[14px]">
        <button className="cursor-pointer" onClick={handleBack}>
          <img src={left} className="w-9 h-9" alt="뒤로가기" />
        </button>
      </div>
    );
  }

  return (
    <div className=" flex justify-between w-full px-4 mt-2.5 mb-10 ">
      <div className="w-6" />
      <div className={`B02_B text-center ${isFeed ? 'text-gray-900' : 'text-white'}`}>{title}</div>
      <button className="cursor-pointer ">
        <img src={isFeed ? alarm_black : alarm_white} className="w-6 h-6 " alt="알림" />
      </button>
    </div>
  );
};
