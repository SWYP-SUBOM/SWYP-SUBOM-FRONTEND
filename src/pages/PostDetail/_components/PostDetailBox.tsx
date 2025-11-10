import heartIcon from '../../../assets/Feed/heart.svg';
import smileIcon from '../../../assets/Feed/smile.svg';
import surpriseIcon from '../../../assets/Feed/surprise.svg';
import viewIcon from '../../../assets/Feed/view.svg';
import { DateFormatter } from '../../../utils/DateFormatter';

interface reactionsType {
  reactionId: number;
  reactionName: string;
  reactionCount: number;
}

interface PostDetailBoxProps {
  content: string;
  updatedAt: string;
  writer: string;
  isMe: boolean;
  reactions: reactionsType[];
  viewCount: number;
}

export const reactionIconMap: Record<number, string> = {
  1: heartIcon,
  2: smileIcon,
  3: surpriseIcon,
};

export const PostDetailBox = ({
  content,
  updatedAt,
  writer,
  reactions,
  viewCount,
}: PostDetailBoxProps) => {
  return (
    <div className="px-4 py-4 rounded-xl w-[328px] min-h-[457px] border border-[#D0D2D9] bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <div className="B01_M text-gray-900 ">By {writer}</div>
          <div className="C01_SB text-gray-700 translate-y-1/7">{DateFormatter(updatedAt)}</div>
        </div>
        <div className="border-t border-[#E0E4E7] my-4"></div>
        <div className="B03_M text-gray-800 ">{content}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {reactions.map((reaction) => (
            <div key={reaction.reactionId} className="flex items-center gap-1">
              <img src={reactionIconMap[reaction.reactionId]} className="w-4 h-4" />
              <div className="C01_M text-gray-700">{reaction.reactionCount}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <img src={viewIcon} className="w-4 h-4" />
          <div className="C01_M text-gray-700">{viewCount}</div>
        </div>
      </div>
    </div>
  );
};
