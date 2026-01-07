import left from '../../../assets/Header/left.svg';

interface HeaderProps {
  title: string;
  button: string;
  onButtonClick?: () => void;
  isDeleteMode?: boolean;
  onBackClick?: () => void;
}

export const Header = ({
  title,
  button,
  onButtonClick,
  isDeleteMode = false,
  onBackClick,
}: HeaderProps) => {
  if (isDeleteMode) {
    return (
      <div className="w-full h-15 bg-white items-center justify-center border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-full">
          <button onClick={onBackClick} className="cursor-pointer">
            <img src={left} className="w-9 h-9" alt="뒤로가기" />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 B02_B text-gray-900">{title}</div>
          <div className="w-9" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-15 bg-white items-center justify-center pr-2.5 relative">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="w-[100px]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 B02_B text-gray-900">{title}</div>
        <div className="flex justify-end">
          <button
            onClick={onButtonClick}
            className="B03_B text-b7 text-center border border-b6 px-[10px] py-2 rounded-[8px] cursor-pointer hover:bg-b7 hover:text-white transition-colors"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};
