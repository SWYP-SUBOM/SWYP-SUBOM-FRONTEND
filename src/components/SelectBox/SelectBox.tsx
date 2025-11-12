import down from '../../assets/Feed/down.svg';

type SelectBoxProps = {
  label: string;
  onClick: () => void;
};

export const SelectBox = ({ label, onClick }: SelectBoxProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex border border-[#D0D2D9] hover:border-gray-750 active:border-gray-750 w-fit px-[10px] py-2 rounded-lg gap-[6px]"
    >
      <div className="B02_M text-gray-800 translate-y-1/9">{label}</div>
      <div>
        <img src={down} className="w-6 h-6" />
      </div>
    </div>
  );
};
