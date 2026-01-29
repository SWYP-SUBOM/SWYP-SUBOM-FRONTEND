import { useNavigate } from 'react-router-dom';
import alarm from '../assets/Header/alarm.svg';
import logoImg from '../assets/Header/logo-img.svg';
import logoName from '../assets/Header/logo-name.png';
import { useNotificationStore } from '../store/useNotificationStore';

export const Header = () => {
  const navigate = useNavigate();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <>
      <div className="flex justify-between w-full px-4 pt-[14px] bg-[#F3F5F8]">
        <div className="flex gap-1">
          <img src={logoImg} className="w-9 h-6" />
          <img src={logoName} className="w-11 h-6" />
        </div>
        <div className="relative cursor-pointer" onClick={() => navigate('/notification')}>
          <img src={alarm} className="w-9 h-6" alt="알림" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>
      </div>
    </>
  );
};
