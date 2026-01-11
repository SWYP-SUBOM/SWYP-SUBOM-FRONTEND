import { SelectBottomSheet } from '../../../../components/SelectBox/SelectBottomSheet';

type DateOption = 'lastWeek' | 'lastMonth' | 'lastYear' | 'all' | 'custom';

interface DateFilterModalProps {
  selected: DateOption;
  onSelect: (date: DateOption) => void;
  onClose: () => void;
}

const dateOptions = [
  { label: '최근 일주일', value: 'lastWeek' as DateOption },
  { label: '최근 1달', value: 'lastMonth' as DateOption },
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
            className="group flex justify-between items-center py-4 text-gray-900 w-full "
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
