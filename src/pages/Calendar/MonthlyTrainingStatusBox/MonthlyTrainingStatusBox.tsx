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
    <div className="flex justify-center items-center mt-3.5 px-4 ">
      <div className="w-full rounded-2xl shadow-sm flex ">
        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <img src={pen} alt="pen" className="w-10 h-10 opacity-60" />
            <div className="flex flex-col gap-1">
              <span className="B02_B">
                <span className="text-blue-600">{totalWritingCount}</span>
                <span className="text-gray-900">회</span>
              </span>
              <span className="C01_M text-gray-900">글쓰기 완료</span>
            </div>
          </div>
        </div>

        <div className="w-px bg-gray-500 self-center h-10"></div>

        <div className="flex-1 flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-3">
            <img src={challenge} alt="challenge" className="w-10 h-10" />
            <div className="flex flex-col gap-1">
              <span className="B02_B">
                <span className="text-blue-600">{totalWeeklyChallengeCount}</span>
                <span className="text-gray-900">회</span>
              </span>
              <span className="C01_M text-gray-900">챌린지 달성</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
