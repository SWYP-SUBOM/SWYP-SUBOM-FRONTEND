import { GUIDE_MAP, type guideTopicType } from '../../../constants/Guide';

export function GuideContent({ topicType }: { topicType: guideTopicType }) {
  return (
    <>
      <div className="bg-white px-5 py-6 rounded-xl">
        {GUIDE_MAP[topicType].contents.map((content, index) => (
          <div key={content.step} className="relative flex pb-2">
            <div className="flex flex-col items-center">
              <div className="B03_B text-[var(--color-b7)] border border-[var(--color-b7)] rounded-full w-5 h-5 flex items-center justify-center">
                {content.step}
              </div>
              {index <= 2 && <div className="w-[1px] bg-gray-500 h-[57px] mt-[10px]" />}
            </div>
            <div className="flex flex-col ml-2 ">
              <div className="B01_B text-[var(--color-b7)]">{content.title}</div>
              <div className="B02_M text-gray-750 whitespace-pre-line justify-start mt-[10px]">
                {content.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
