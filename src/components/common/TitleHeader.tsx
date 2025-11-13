import { useNavigate } from 'react-router-dom';
import alarm from '../../assets/Header/alarm_white.svg';
import left from '../../assets/Header/left.svg';

interface TitleHeaderProps {
  showDateHeader?: boolean;
  title: string;
  onBack?: () => void;
}

export const TitleHeader = ({ showDateHeader = false, title, onBack }: TitleHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (showDateHeader) {
    return (
      <div className="flex items-center justify-between w-full  px-4 mt-2.5 mb-10">
        <button className="cursor-pointer" onClick={handleBack}>
          <img src={left} className="w-6 h-6" alt="뒤로가기" />
        </button>
        <div className="B02_B text-gray-900">{title}</div>
        <div className="w-6" />
      </div>
    );
  }

  return (
    <div className=" flex justify-between w-full  px-4  mt-2.5 mb-10 ">
      <div className="w-6" />
      <div className="B02_B text-center text-white">{title}</div>
      <button className="cursor-pointer ">
        <img src={alarm} className="w-6 h-6 " alt="알림" />
      </button>
    </div>
  );
};
