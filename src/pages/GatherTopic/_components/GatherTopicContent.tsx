import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestBottomSheet } from '../../../components/common/GuestBottomSheet';
import { SelectBox } from '../../../components/SelectBox/SelectBox';
import { useGetTopics } from '../../../hooks/Feed/useGetTopics';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { useAuthStore } from '../../../store/useAuthStore';
import { GAEvents } from '../../../utils/GAEvent';
import { SelectSortBottomSheet } from './SelectSortBottomSheet';

export const GatherTopicContent = ({ categoryId }: { categoryId: number }) => {
  const selectSortItems = [
    { label: '최신순', value: 'latest' },
    { label: '오래된순', value: 'oldest' },
  ];

  const [selectedSort, setSelectedSort] = useState({
    label: '최신순',
    value: 'latest',
  });
  const { data: TopicsData, isLoading } = useGetTopics(categoryId, selectedSort.value);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { openBottomSheet } = useBottomSheet();

  const movetoFeedByTopic = (topicId: number, categoryId: number) => {
    if (isLoggedIn) {
      GAEvents.pastTopicFeedView(topicId);
      navigate(`/feed/${topicId}/${categoryId}`, {
        state: { fromGather: true },
      });
    } else {
      openBottomSheet(<GuestBottomSheet />);
    }
  };

  return (
    <>
      <div className="pt-[26px] flex justify-end ">
        <SelectBox label={selectedSort.label} onClick={() => setIsBottomSheetOpen(true)} />
      </div>
      <div className="flex flex-col gap-[10px] pt-[14px]">
        {!isLoading &&
          TopicsData?.topics.map((Topic) => (
            <div
              key={Topic.topicId}
              onClick={() => movetoFeedByTopic(Topic.topicId, categoryId)}
              className="cursor-pointer"
            >
              <div className="B03_M text-gray-900 pb-[14px]">{Topic.topicName}</div>
              <div className="C01_SB text-gray-700 text-right mt-1">{Topic.usedAt}</div>
              <div className="border-t border-[#E0E4E7] my-4"></div>
            </div>
          ))}
      </div>
      {isBottomSheetOpen && (
        <SelectSortBottomSheet
          title="정렬 기준"
          selectItems={selectSortItems}
          selected={selectedSort.value}
          onSelect={setSelectedSort}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}
    </>
  );
};
