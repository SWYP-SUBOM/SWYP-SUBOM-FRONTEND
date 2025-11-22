interface ButtonProps {
  label: string;
  primary?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ label, primary, icon, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`B02_B w-82 h-14 mx-4 rounded-xl text-white transition-colors duration-300 flex items-center justify-center gap-2 ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-b7 active:bg-b8 active:scale-95 hover:bg-b8 cursor-pointer'
      } ${primary}`}
    >
      {icon && <img src={icon} alt="icon" className="w-4.5 h-4.5" />}
      {label}
    </button>
  );
};
