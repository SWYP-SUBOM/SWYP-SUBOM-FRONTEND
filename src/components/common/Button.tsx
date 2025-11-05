interface ButtonProps {
  label: string;
  primary?: string;
}

export const Button = ({ label, primary }: ButtonProps) => {
  return (
    <button
      className={`B02_B w-82 h-14 mx-4  rounded-xl bg-b7 text-white active:bg-b8 active:scale-95 hover:bg-b8 transition-colors duration-300 cursor-pointer ${primary}`}
    >
      {label}
    </button>
  );
};
