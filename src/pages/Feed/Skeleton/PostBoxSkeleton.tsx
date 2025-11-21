export const PostBoxSkeleton = () => (
  <div className="px-4 py-4 rounded-xl w-full h-[185px] border border-[#E0E4E7] bg-white flex flex-col justify-between animate-pulse">
    <div className="flex justify-between">
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
      <div className="h-6 w-6 bg-gray-300 rounded"></div>
    </div>
    <div className="h-12 bg-gray-300 rounded pt-6"></div>
    <div className="flex justify-between">
      <div className="flex gap-3 items-center">
        <div className="flex gap-2">
          <div className="h-5 w-5 -translate-y-1/9 bg-gray-300 rounded"></div>
          <div className="h-4 w-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-5 -translate-y-1/9 bg-gray-300 rounded"></div>
          <div className="h-4 w-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="h-5 w-12 bg-gray-300 rounded"></div>
    </div>
  </div>
);
