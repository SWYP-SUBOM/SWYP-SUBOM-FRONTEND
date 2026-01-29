import React from 'react';

interface StepIndicatorProps {
  step: number;
  prevText: string;
  currentLength: number;
}

export const StepIndicator = ({ step, prevText, currentLength }: StepIndicatorProps) => {
  const steps = [1, 2, 3];

  const getLastSentence = (text: string) => {
    if (!text) return '';
    const sentences = text.trim().split(/[.!?]+/);
    const filteredSentences = sentences.filter((s) => s.trim().length > 0);
    const lastSentence = filteredSentences[filteredSentences.length - 1]?.trim() || '';
    const lastPunctuation = text.trim().match(/[.!?]+$/)?.[0] || '';

    return lastSentence + lastPunctuation;
  };

  return (
    <div className="pt-4 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full px-1">
        <div className="flex items-center gap-1.5">
          {steps.map((num, index) => {
            const isLast = index === steps.length - 1;
            const isPassed = step > num;
            const isCurrent = step === num;

            return (
              <React.Fragment key={num}>
                <div className="flex items-center justify-center">
                  {isCurrent ? (
                    <div className="flex items-center justify-center bg-b7 text-white px-3 py-1.5 rounded-full">
                      <span className="C01_SB">{num}단계</span>
                    </div>
                  ) : isPassed ? (
                    <div className="w-3 h-3 rounded-full bg-b5" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>

                {!isLast && (
                  <div className="flex items-center px-0.5">
                    {isPassed ? (
                      <div className="w-4 h-[2px] bg-b5" />
                    ) : (
                      <div className="flex items-center gap-0.5">
                        <div className="w-[3px] h-[2px] bg-gray-300 rounded-full" />
                        <div className="w-[8px] h-[2px] bg-gray-300 rounded-full" />
                        <div className="w-[3px] h-[2px] bg-gray-300 rounded-full" />
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <span className="C01_SB text-gray-800">{currentLength}</span>
          <span className="C01_SB text-gray-700"> / 700</span>
        </div>
      </div>

      {step > 1 && prevText && (
        <div className="mt-4 px-1">
          <div className="pb-1">
            <p className="B03_M text-gray-750 line-clamp-1">{getLastSentence(prevText)}</p>
          </div>

          <div className="w-full h-[1px] bg-gray-300" />
        </div>
      )}
    </div>
  );
};
