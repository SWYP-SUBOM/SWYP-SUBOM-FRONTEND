interface ButtonProps {
  label: string;
  primary?: boolean;
}

export const Button = ({ label, primary = false }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        primary ? 'bg-blue-500 text-white' : 'bg-red-100 text-black'
      } `}
    >
      {label}
    </button>
  );
};
