import pen from '../../../assets/Calendar/pen.svg';
import challenge from '../../../assets/Calendar/challenge.svg';

interface MonthlyTrainingStatusBoxProps {
  totalWritingCount?: number;
  totalWeeklyChallengeCount?: number;
}

export const MonthlyTrainingStatusBox = ({
  totalWritingCount = 0,
  totalWeeklyChallengeCount = 0,
}: MonthlyTrainingStatusBoxProps) => {
  return (
    <div className="flex justify-center items-center mt-3.5 px-4">
      <div className="w-full bg-white rounded-2xl shadow-sm flex divide-x divide-gray-200">
        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <img src={pen} alt="pen" className="w-10 h-10 opacity-60" />
            <div className="flex flex-col gap-1">
              <span className="B02_B text-blue-600">{totalWritingCount}회</span>
              <span className="B02_B text-gray-900 text-xs font-semibold">글쓰기 완료</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <img src={challenge} alt="challenge" className="w-10 h-10" />
            <div className="flex flex-col gap-1">
              <span className="B02_B text-blue-600">{totalWeeklyChallengeCount}회</span>
              <span className="B02_B text-gray-900">챌린지 달성</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
