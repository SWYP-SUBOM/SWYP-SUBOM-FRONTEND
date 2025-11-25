import pointsToImproveIcon from '../../../assets/Feedback/pointsToImprove.svg';
import strengthIcon from '../../../assets/Feedback/strength.svg';

interface FeedbackBoxProps {
  strength: string;
  improvementPoints: string[];
}

export const FeedbackBox = ({ strength, improvementPoints }: FeedbackBoxProps) => {
  return (
    <div className="flex-1 mt-[14px] p-4 border border-[var(--color-b3)] bg-[#FFFFFF] rounded-xl shadow-[0px_0px_30px_0px_#D0D2D9]">
      <div className="flex gap-2">
        <img src={strengthIcon} className="w-6 h-6" />
        <span className="text-[var(--color-b5)] B02_B pb-2">강점</span>
      </div>
      <div className=" B03_M text-gray-900">{strength}</div>
      <div className="border-t border-[#E0E4E7] my-4"></div>
      <div className="flex gap-2">
        <img src={pointsToImproveIcon} className="w-6 h-6" />
        <span className="text-[var(--color-b5)] B02_B pb-2">개선 포인트</span>
      </div>
      {improvementPoints?.map((point, index) => (
        <div key={index} className=" B03_M text-gray-900">
          {point}
        </div>
      ))}
    </div>
  );
};
