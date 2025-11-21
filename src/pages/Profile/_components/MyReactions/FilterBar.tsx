import downIcon from '../../../../assets/Feed/down.svg';

interface FilterBarProps {
  sortLabel: string;
  dateLabel: string;
  onSortClick: () => void;
  onDateClick: () => void;
}

export const FilterBar = ({ sortLabel, dateLabel, onSortClick, onDateClick }: FilterBarProps) => {
  return (
    <div className="px-4 flex gap-2 ">
      <button
        onClick={onSortClick}
        className="gap-2 flex items-center px-3 py-2 bg-white rounded-[10px] border border-gray-500 cursor-pointer"
      >
        <span className="B02_M text-gray-800">{sortLabel}</span>
        <img src={downIcon} alt="down" className="w-6 h-6" />
      </button>
      <button
        onClick={onDateClick}
        className="gap-2 flex items-center px-3 py-2 bg-white rounded-[10px] border border-gray-500 cursor-pointer"
      >
        <span className="B02_M text-gray-800">{dateLabel}</span>
        <img src={downIcon} alt="down" className="w-6 h-6" />
      </button>
    </div>
  );
};
