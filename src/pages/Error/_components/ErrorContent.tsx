import Warning from '../../../assets/Error/Warning_icon.svg';

interface ErrorContentProps {
  errorTitle: string;
  errorMessage: string;
  errorType: string;
}

export const ErrorContent = (errorContentProps: ErrorContentProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img className="w-[70px] h-[70px] mb-4" src={Warning} alt="Warning" />

      <div className="font-bold text-[64px] text-gray-900 leading-none mb-2">
        {errorContentProps.errorType}
      </div>

      <div className="T02_B text-gray-900 mb-1">{errorContentProps.errorTitle}</div>

      <div className="B03_1_M text-gray-800 whitespace-pre-line">
        {errorContentProps.errorMessage}
      </div>
    </div>
  );
};
