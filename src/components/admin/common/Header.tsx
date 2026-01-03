interface HeaderProps {
  title: string;
  button: string;
}

export const Header = ({ title, button }: HeaderProps) => {
  return (
    <div className=" w-full h-15 bg-white pr-2.5">
      <div className="grid grid-cols-3 items-center w-full ">
        <div></div>
        <div className="B02_B text-gray-900 text-center flex items-center justify-center">
          {title}
        </div>
        <div className="flex justify-end">
          <button className="B03_B text-b7 text-center border border-b6 px-[10px] py-2 rounded-[8px]">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};
