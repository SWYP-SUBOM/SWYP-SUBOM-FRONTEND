import alarm from '../assets/Header/alarm.svg';
import logoImg from '../assets/Header/logo-img.svg';
import logoName from '../assets/Header/logo-name.svg';

export const Header = () => {
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex gap-1">
          <img src={logoImg} className="w-9 h-6" />
          <img src={logoName} className="w-9 h-6" />
        </div>
        <div>
          <img src={alarm} className="w-9 h-6" />
        </div>
      </div>
    </>
  );
};
