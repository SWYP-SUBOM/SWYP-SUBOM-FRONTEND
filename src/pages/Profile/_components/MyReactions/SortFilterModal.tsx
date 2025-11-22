import { SelectBottomSheet } from '../../../../components/SelectBox/SelectBottomSheet';

type SortOption = 'latest' | 'oldest';

interface SortFilterModalProps {
  selected: SortOption;
  onSelect: (sort: SortOption) => void;
  onClose: () => void;
}

const sortOptions = [
  { label: '최신순', value: 'latest' as SortOption },
  { label: '오래된순', value: 'oldest' as SortOption },
];

export const SortFilterModal = ({ selected, onSelect, onClose }: SortFilterModalProps) => {
  return (
    <SelectBottomSheet title="정렬 기준" onClose={onClose}>
      <div className="flex flex-col">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className="group flex justify-between items-center py-4 text-gray-900 w-full"
            onClick={() => {
              onSelect(option.value);
              onClose();
            }}
          >
            <span className="B02_M text-gray-800">{option.label}</span>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === option.value ? 'border-b7' : 'border-gray-500 hover:border-gray-500'
              }`}
            >
              {selected === option.value ? (
                <span className="w-3 h-3 bg-b7 rounded-full"></span>
              ) : (
                <span className="w-3 h-3 bg-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              )}
            </div>
          </button>
        ))}
      </div>
    </SelectBottomSheet>
  );
};
