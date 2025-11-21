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
            className="flex justify-between items-center py-4 text-gray-900 w-full"
            onClick={() => {
              onSelect(option.value);
              onClose();
            }}
          >
            <span className="B02_M text-gray-800">{option.label}</span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === option.value ? 'border-blue-600' : 'border-gray-400'
              }`}
            >
              {selected === option.value && (
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
              )}
            </div>
          </button>
        ))}
      </div>
    </SelectBottomSheet>
  );
};
