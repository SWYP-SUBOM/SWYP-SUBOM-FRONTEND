import righticon from '../../../assets/Profile/right.svg';

interface ProfileContentsProps {
  title: string;
  icon?: string;
  righticon: string;
  onClick: () => void;
}

export const ProfileContents = ({ title, icon, righticon, onClick }: ProfileContentsProps) => {
  return (
    <div className="flex  justify-between  bg-white rounded-xl mx-4 p-4">
      <div>{title}</div>
      <button onClick={onClick} className="cursor-pointer">
        {righticon && <img src={righticon} alt="icon" className="w-9 h-9" />}
      </button>
    </div>
  );
};
