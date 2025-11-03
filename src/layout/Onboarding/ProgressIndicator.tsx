interface ProgressIndicatorProps {
  activeIndexes: number[];
  total: number;
}

export const ProgressIndicator = ({ activeIndexes, total }: ProgressIndicatorProps) => {
  return (
    <div className="absolute sm:top-[107px] top-[50px] left-0 right-0 flex justify-center z-10">
      <div className="flex items-center gap-2.5">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={
              activeIndexes.includes(index)
                ? 'w-4 h-2 bg-b7 rounded-[100px]'
                : 'w-2 h-2 bg-gray-500 rounded-full'
            }
          />
        ))}
      </div>
    </div>
  );
};
