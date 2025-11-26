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
      <div className="flex justify-between w-full px-4 pt-[14px]">
        <div className="flex gap-1">
          <img src={logoImg} className="w-9 h-6" />
          <img src={logoName} className="w-11 h-6" />
        </div>
        <div className="relative" onClick={() => navigate('/notification')}>
          <img src={alarm} className="w-9 h-6 cursor-pointer" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </div>
      </div>
    </>
  );
};
