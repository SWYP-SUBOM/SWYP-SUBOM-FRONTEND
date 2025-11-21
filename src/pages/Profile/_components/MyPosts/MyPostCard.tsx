import rightIcon from '../../../../../assets/Feed/right.svg';

interface MyPostCardProps {
  category: string;
  question: string;
  summary: string;
  status: string;
  date: string;
  onClick: () => void;
}

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    COMPLEMENT: '보완',
    COMPLETE: '완료',
    DRAFT: '임시저장',
  };
  return statusMap[status] || status;
};

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    COMPLEMENT: 'border-orange-400 text-orange-600 bg-orange-50',
    COMPLETE: 'border-green-400 text-green-600 bg-green-50',
    DRAFT: 'border-gray-400 text-gray-600 bg-gray-50',
  };
  return colorMap[status] || 'border-gray-400 text-gray-600 bg-gray-50';
};

export const MyPostCard = ({
  category,
  question,
  summary,
  status,
  date,
  onClick,
}: MyPostCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="inline-block px-2.5 py-1 bg-blue-100 rounded-md">
              <span className="B03_M text-blue-600">{category}</span>
            </div>
            {status && (
              <div
                className={`inline-block px-2.5 py-1 border rounded-md ${getStatusColor(status)}`}
              >
                <span className="B03_M">{getStatusLabel(status)}</span>
              </div>
            )}
          </div>
          <div className="B02_M text-gray-900 mb-3 leading-relaxed">{question}</div>
          <div className="B02_B text-gray-900 mb-3 leading-relaxed">{summary}</div>
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
