interface InfoCardProps {
  label: string;
  value: string | null | undefined;
  isLoading?: boolean;
  showChangeButton?: boolean;
  onChange?: () => void;
}

export const InfoCard = ({
  label,
  value,
  isLoading = false,
  showChangeButton = false,
  onChange,
}: InfoCardProps) => {
  const displayValue = isLoading ? '...' : value || '';

  if (showChangeButton) {
    return (
      <div className="bg-white rounded-xl p-4  ">
        <div className="flex items-center justify-between ">
          <div className="flex-1">
            <div className="B01_B text-gray-900 mb-2">{label}</div>
            <div className="B02_M text-gray-900">{displayValue}</div>
          </div>
          {onChange && (
            <button onClick={onChange} className="B03_1_M text-gray-800 ml-4  mt-7 shrink-0">
              변경 &gt;
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 cursor-pointer ">
      <div className="B01_B text-gray-900 mb-2">{label}</div>
      <div className="B02_M text-gray-900">{displayValue}</div>
    </div>
  );
};
