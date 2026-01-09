export const TopicBoxSkeleton = () => (
  <div className="relative w-[400px] h-[270px] bg-gray-200 animate-pulse px-4 py-7">
    <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
    <div className="h-12 w-[320px] bg-gray-300 rounded mb-[23px]"></div>
    <div className="absolute right-5 bottom-5 w-[87px] h-[86px] bg-gray-300"></div>
    <div className="absolute bottom-5 left-4 flex items-center gap-1">
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
      <div className="w-6 h-6 bg-gray-300 "></div>
    </div>
  </div>
);
