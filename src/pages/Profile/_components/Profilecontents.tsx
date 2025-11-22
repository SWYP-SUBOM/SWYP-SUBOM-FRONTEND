import rightIcon from '../../../assets/Profile/right.svg';

interface ProfileContentsProps {
  title: string;
  icon?: string;
  righticon?: boolean;
  onClick: () => void;
}

export const ProfileContents = ({ title, icon, righticon, onClick }: ProfileContentsProps) => {
  return (
    <div className="mx-4 ">
      <button
        onClick={onClick}
        className="flex items-center justify-between bg-white rounded-xl w-full p-4 text-lef hover:shadow-md transition-shadow duration-300 cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {icon && (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <img src={icon} alt="icon" className="w-6 h-6" />
            </div>
          )}
          <span className="B02_B text-gray-900 truncate">{title}</span>
        </div>
        {righticon && (
          <img src={rightIcon} alt="icon" className="w-6 h-6 shrink-0 ml-2 cursor-pointer" />
        )}
      </button>
    </div>
  );
};
