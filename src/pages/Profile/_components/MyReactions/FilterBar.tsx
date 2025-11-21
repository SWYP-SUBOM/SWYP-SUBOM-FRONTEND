interface FilterBarProps {
  sortLabel: string;
  dateLabel: string;
  onSortClick: () => void;
  onDateClick: () => void;
}

export const FilterBar = ({ sortLabel, dateLabel, onSortClick, onDateClick }: FilterBarProps) => {
  return (
    <div className="px-4 mt-4 flex gap-2">
      <button
        onClick={onSortClick}
        className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-gray-200 flex-1"
      >
        <span className="B02_M text-gray-900">{sortLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-2">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onDateClick}
        className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-gray-200 flex-1"
      >
        <span className="B02_M text-gray-900">{dateLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-2">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
