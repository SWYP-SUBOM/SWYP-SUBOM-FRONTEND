import { SelectBottomSheet } from '../../../../components/SelectBox/SelectBottomSheet';

interface PeriodSelectionModalProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateClick: () => void;
  onEndDateClick: () => void;
  onClose: () => void;
}

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const PeriodSelectionModal = ({
  startDate,
  endDate,
  onStartDateClick,
  onEndDateClick,
  onClose,
}: PeriodSelectionModalProps) => {
  return (
    <SelectBottomSheet title="기간 선택" onClose={onClose}>
      <div className="flex flex-col">
        <button
          onClick={onStartDateClick}
          className="flex justify-between items-center py-4 text-gray-900 w-full"
        >
          <span className="B02_M text-gray-800">시작일</span>
          <div className="flex items-center gap-2">
            <span className="B02_M text-gray-600">
              {startDate ? formatDate(startDate) : '선택'}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        <button
          onClick={onEndDateClick}
          className="flex justify-between items-center py-4 text-gray-900 w-full"
        >
          <span className="B02_M text-gray-800">종료일</span>
          <div className="flex items-center gap-2">
            <span className="B02_M text-gray-600">{endDate ? formatDate(endDate) : '선택'}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </SelectBottomSheet>
  );
};
