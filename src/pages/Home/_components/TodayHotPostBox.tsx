import { useNavigate } from 'react-router-dom';
import heartIcon from '../../../assets/Feed/heart.svg';
import right from '../../../assets/Feed/right.svg';
import viewIcon from '../../../assets/Feed/view.svg';
import type { CategoryNameType } from '../../../constants/Category';
import { DateFormatter } from '../../../utils/DateFormatter';
import { CategoryTag } from './CategoryTag';

interface TodayHotPostBoxProps {
  categoryName: CategoryNameType;
  summary: string;
  totalReactions: number;
  updatedAt: string;
  postViews: number;
  postId: number;
}
export const TodayHotPostBox = ({
  categoryName,
  summary,
  totalReactions,
  updatedAt,
  postViews,
  postId,
}: TodayHotPostBoxProps) => {
  const summaryShort = summary.length > 100 ? summary.slice(0, 100) : summary;
  const navigate = useNavigate();

  const movetoDetail = (postId: number) => {
    navigate(`/postdetail/${postId}`);
  };

  return (
    <>
      <div
        onClick={() => movetoDetail(postId)}
        className="cursor-pointer px-4 py-4 rounded-xl w-full h-[185px] border border-[#E0E4E7] bg-white flex flex-col justify-between
      hover:shadow-[0_0_30px_0_#D0D2D9] active:shadow-[0_0_30px_0_#D0D2D9]"
      >
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CategoryTag categoryName={categoryName}></CategoryTag>
            </div>
            <div>
              <img src={right} className="w-6 h-6" />
            </div>
          </div>
          <div className="B02_B text-gray-900 pt-6 line-clamp-2">{summaryShort}</div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-3">
              <div className="flex gap-2">
                <img src={heartIcon} className="w-5 h-5 -translate-y-1/9" />
                <div className="C01_M text-gray-700">{totalReactions}</div>
              </div>
              <div className="flex gap-2">
                <img src={viewIcon} className="w-5 h-5 -translate-y-1/9" />
                <div className="C01_M text-gray-700">{postViews}</div>
              </div>
            </div>
          </div>
          <div className="C01_M text-gray-700">{DateFormatter(updatedAt)}</div>
        </div>
      </div>
    </>
  );
};
