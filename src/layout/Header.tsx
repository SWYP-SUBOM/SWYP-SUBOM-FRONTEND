import { useNavigate } from 'react-router-dom';
import alarm from '../assets/Header/alarm.svg';
import logoImg from '../assets/Header/logo-img.svg';
import logoName from '../assets/Header/logo-name.png';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between w-full px-4 pt-[14px]">
        <div className="flex gap-1">
          <img src={logoImg} className="w-9 h-6" />
          <img src={logoName} className="w-11 h-6" />
        </div>
        <div onClick={() => navigate('/notification')}>
          <img src={alarm} className="w-9 h-6 cursor-pointer" />
        </div>
      </div>
    </>
  );
};
