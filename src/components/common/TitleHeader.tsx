import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alarm_black from '../../assets/Header/alarm.svg';
import alarm_white from '../../assets/Header/alarm_white.svg';
import left from '../../assets/Header/left.svg';
import { useNotificationStore } from '../../store/useNotificationStore';

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
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  // 디버깅: unreadCount 변경 추적
  useEffect(() => {
    console.log('TitleHeader: unreadCount 변경됨', unreadCount);
  }, [unreadCount]);

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
        {title && (
          <div className="absolute left-1/2 transform -translate-x-1/2 B02_B text-gray-900">
            {title}
          </div>
        )}
        <div className="w-9" />
      </div>
    );
  }

  return (
    <div className="flex justify-between w-full px-4 mt-2.5 mb-10 ">
      <div className="w-9 h-6" />
      <div
        className={`B02_B text-center translate-y-1 pt-1 ${isFeed ? 'text-gray-900' : 'text-white'}`}
      >
        {title}
      </div>
      <button className="cursor-pointer pt-1 relative" onClick={() => navigate('/notification')}>
        <img src={isFeed ? alarm_black : alarm_white} className="w-9 h-6 " alt="알림" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    </div>
  );
};
