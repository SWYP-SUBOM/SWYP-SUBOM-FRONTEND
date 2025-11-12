import heartIcon from '../../../assets/Feed/heart.svg';
import right from '../../../assets/Feed/right.svg';
import viewIcon from '../../../assets/Feed/view.svg';
import { DateFormatter } from '../../../utils/DateFormatter';

interface PostBoxProps {
  onClick: () => void;
  nickname: string;
  summary: string;
  heart: number;
  completedAt: string;
  view: number;
}

export const PostBox = ({ onClick, nickname, summary, heart, completedAt, view }: PostBoxProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-4 rounded-xl w-[328px] h-[185px] border border-[#E0E4E7] bg-white flex flex-col justify-between
      hover:shadow-[0_0_30px_0_#D0D2D9] active:shadow-[0_0_30px_0_#D0D2D9]"
    >
      <div>
        <div className="flex justify-between">
          <div className="B03-1_M text-gray-900 ">By {nickname}</div>
          <div>
            <img src={right} className="w-6 h-6" />
          </div>
        </div>
        <div className="B02_B text-gray-900 pt-6">{summary}</div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-3">
            <div className="flex gap-2">
              <img src={heartIcon} className="w-5 h-5 -translate-y-1/9" />
              <div className="C01_M text-gray-700">{heart}</div>
            </div>
            <div className="flex gap-2">
              <img src={viewIcon} className="w-5 h-5 -translate-y-1/9" />
              <div className="C01_M text-gray-700">{view}</div>
            </div>
          </div>
        </div>
        <div className="C01_M text-gray-700">{DateFormatter(completedAt)}</div>
      </div>
    </div>
  );
};
