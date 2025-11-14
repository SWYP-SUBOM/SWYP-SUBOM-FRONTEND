import Warning from '../../../assets/Error/Warning_icon.svg';

interface ErrorContentProps {
  errorTitle: string;
  errorMessage: string;
}

export const ErrorContent = (errorContentProps: ErrorContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-12 pt-[100px] md:pt-[189px] ">
      <img className="w-[70px] h-[70px] mb-5" src={Warning} alt="Warning" />
      <div className="flex flex-col items-center justify-center font-bold text-[64px] text-gray-900">
        404
      </div>
      <div className="T02_B text-gray-900 mb-2">{errorContentProps.errorTitle}</div>
      <div className="text-center text-gray-800 B03_1_M">{errorContentProps.errorMessage}</div>
    </div>
  );
};
