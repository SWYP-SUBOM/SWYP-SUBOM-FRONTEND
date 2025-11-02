import { useLocation } from 'react-router-dom';
import { CategoryChip } from '../../components/common/CategoryChip';

export const Write = () => {
  const location = useLocation();

  const categoryName = location.state.categoryName;
  const topicName = location.state.topicName;

  return (
    <>
      <div className="px-4 bg-[#F3F5F8]">
        <div className="pt-[30px] pb-3">
          <CategoryChip categoryName={categoryName}></CategoryChip>
          <div className="py-[10px] B01_B">{topicName}</div>
        </div>
      </div>
    </>
  );
};
