import { SelectBottomSheet } from '../../../components/SelectBox/SelectBottomSheet';

type SelectItemType = {
  label: string;
  value: string;
};

type SelectBottomSheetType = {
  title: string;
  selectItems: SelectItemType[];
  selected: string;
  onSelect: (item: SelectItemType) => void;
  onClose: () => void;
};

export const SelectSortBottomSheet = ({
  title,
  selectItems,
  selected,
  onSelect,
  onClose,
}: SelectBottomSheetType) => {
  return (
    <SelectBottomSheet title={title} onClose={onClose}>
      <div className="flex flex-col">
        {selectItems.map((item) => (
          <button
            key={item.value}
            className="flex justify-between items-center py-4 text-gray-900 "
          >
            <span className="B02_M text-gray-800">{item.label}</span>
            <span
              className={`cursor-pointer w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === item.value ? 'border-[var(--color-b7)]' : 'border-gray-500 '
              }`}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              {selected === item.value ? (
                <span className="w-2.5 h-2.5 bg-[var(--color-b7)] rounded-full"></span>
              ) : (
                <span className="w-2.5 h-2.5 hover:bg-gray-500 rounded-full"></span>
              )}
            </span>
          </button>
        ))}
      </div>
    </SelectBottomSheet>
  );
};
