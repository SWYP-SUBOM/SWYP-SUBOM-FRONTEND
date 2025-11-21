import rightIcon from '../../../../assets/Feed/right.svg';

interface ReactionPostCardProps {
  category: string;
  question: string;
  reaction: string;
  date: string;
  onClick: () => void;
}

export const ReactionPostCard = ({
  category,
  question,
  reaction,
  date,
  onClick,
}: ReactionPostCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="inline-block px-2.5 py-1 bg-blue-100 rounded-md mb-3">
            <span className="B03_M text-blue-600">{category}</span>
          </div>
          <div className="B02_M text-gray-900 mb-3 leading-relaxed">{question}</div>
          <div className="B02_B text-gray-900 mb-3 leading-relaxed">{reaction}</div>
        </div>
        <div className="shrink-0">
          <img src={rightIcon} alt="right" className="w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-end mt-3 -mr-2">
        <span className="C01_M text-gray-400">{date}</span>
      </div>
    </div>
  );
};
