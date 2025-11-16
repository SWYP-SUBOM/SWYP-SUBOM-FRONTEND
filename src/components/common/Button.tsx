interface ButtonProps {
  label: string;
  primary?: string;
  icon?: string;
  onClick?: () => void;
}

export const Button = ({ label, primary, icon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`B02_B w-82 h-14 mx-4 rounded-xl bg-b7 text-white active:bg-b8 active:scale-95 hover:bg-b8 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 ${primary}`}
    >
      {icon && <img src={icon} alt="icon" className="w-4.5 h-4.5" />}
      {label}
    </button>
  );
};
