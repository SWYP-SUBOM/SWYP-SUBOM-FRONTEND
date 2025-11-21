import { SelectBottomSheet } from '../../../../components/SelectBox/SelectBottomSheet';

type DateOption = 'lastWeek' | 'lastMonth' | 'lastYear' | 'all' | 'custom';

interface DateFilterModalProps {
  selected: DateOption;
  onSelect: (date: DateOption) => void;
  onClose: () => void;
}

const dateOptions = [
  { label: '지난 주', value: 'lastWeek' as DateOption },
  { label: '지난 달', value: 'lastMonth' as DateOption },
  { label: '최근 1년', value: 'lastYear' as DateOption },
  { label: '모든 날짜', value: 'all' as DateOption },
  { label: '기간 선택', value: 'custom' as DateOption },
];

export const DateFilterModal = ({
  selected,
  onSelect,
  onClose,
  onCustomSelect,
}: DateFilterModalProps & { onCustomSelect?: () => void }) => {
  return (
    <SelectBottomSheet title="날짜 선택" onClose={onClose}>
      <div className="flex flex-col">
        {dateOptions.map((option) => (
          <button
            key={option.value}
            className="flex justify-between items-center py-4 text-gray-900 w-full"
            onClick={() => {
              if (option.value === 'custom') {
                onCustomSelect?.();
              } else {
                onSelect(option.value);
                onClose();
              }
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
