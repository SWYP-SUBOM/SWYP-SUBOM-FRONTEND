import { motion } from 'framer-motion';
import { WriteLayout } from '../../layout/WriteLayout';
import { FeedbackBanner } from './_components/FeedbackBanner';

export const Skeleton = () => {
  return (
    <>
      <WriteLayout isSaveDisabled={true}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-[100dvh] flex flex-col pt-[30px] min-h-[100dvh] px-4 bg-[#F3F5F8]"
        >
          <FeedbackBanner>써봄이가 피드백을 준비했어요!</FeedbackBanner>
          <div className="flex-1">
            <div className="flex-1 mt-[14px] p-4 border border-gray-300 bg-gray-200 rounded-xl shadow-[0px_0px_30px_0px_#D0D2D9]"></div>
            <div className="h-[50px]" />
          </div>
          <div className="sticky bottom-0 left-0 right-0 flex justify-center bg-[#F3F5F8] pb-7 pt-4 transition-shadow duration-300">
            <div className="flex gap-2 w-[340px]">
              <button className="cursor-pointer flex-2 h-14 bg-gray-300 text-gray-800 rounded-xl B02_B">
                작성완료
              </button>
              <button className="cursor-pointer flex-3 h-14 bg-[var(--color-b7)] active:bg-[var(--color-b8)] hover:bg-[var(--color-b8)] text-white rounded-xl B02_B">
                보완하기
              </button>
            </div>
          </div>
        </motion.div>
      </WriteLayout>
    </>
  );
};
