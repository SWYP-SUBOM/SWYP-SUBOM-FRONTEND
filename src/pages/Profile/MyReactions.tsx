import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TitleHeader } from '../../components/common/TitleHeader.tsx';
import { useGetMyReactions } from '../../hooks/Profile/useGetMyReactions.ts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { FilterBar } from './_components/MyReactions/FilterBar.tsx';
import { SortFilterModal } from './_components/MyReactions/SortFilterModal.tsx';
import { DateFilterModal } from './_components/MyReactions/DateFilterModal.tsx';
import { PeriodSelectionModal } from './_components/MyReactions/PeriodSelectionModal.tsx';
import { DatePicker } from './_components/MyReactions/DatePicker.tsx';
import { ReactionPostCard } from './_components/MyReactions/ReactionPostCard.tsx';

type SortOption = 'latest' | 'oldest';
type DateOption = 'lastWeek' | 'lastMonth' | 'lastYear' | 'all' | 'custom';

export const MyReactions = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOption>('latest');
  const [dateFilter, setDateFilter] = useState<DateOption>('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyReactions({
    size: 10,
    sort: sort === 'latest' ? 'latest' : 'oldest',
  });

  const getSortLabel = (sortOption: SortOption) => {
    return sortOption === 'latest' ? '최신순' : '오래된순';
  };

  const getDateLabel = (dateOption: DateOption) => {
    const labels: Record<DateOption, string> = {
      lastWeek: '지난 주',
      lastMonth: '지난 달',
      lastYear: '최근 1년',
      all: '날짜 선택',
      custom: '기간 선택',
    };
    return labels[dateOption];
  };

  const allPosts = data?.pages.flatMap((page) => page?.items ?? []) ?? [];

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin: '300px',
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="flex flex-col min-h-screen pt-10 bg-gray-50">
      <TitleHeader title="내가 반응 남긴 글" headerWithNoalarm={true} />
      <FilterBar
        sortLabel={getSortLabel(sort)}
        dateLabel={getDateLabel(dateFilter)}
        onSortClick={() => setShowSortModal(true)}
        onDateClick={() => setShowDateModal(true)}
      />
      <AnimatePresence>
        {showSortModal && (
          <SortFilterModal
            selected={sort}
            onSelect={setSort}
            onClose={() => setShowSortModal(false)}
          />
        )}
        {showDateModal && (
          <DateFilterModal
            selected={dateFilter}
            onSelect={(value) => {
              setDateFilter(value);
              if (value !== 'custom') {
                setShowDateModal(false);
              }
            }}
            onClose={() => setShowDateModal(false)}
            onCustomSelect={() => {
              setShowDateModal(false);
              setShowPeriodModal(true);
            }}
          />
        )}
        {showPeriodModal && (
          <PeriodSelectionModal
            startDate={startDate}
            endDate={endDate}
            onStartDateClick={() => {
              setShowPeriodModal(false);
              setShowStartDatePicker(true);
            }}
            onEndDateClick={() => {
              setShowPeriodModal(false);
              setShowEndDatePicker(true);
            }}
            onClose={() => {
              setShowPeriodModal(false);
              if (startDate && endDate) {
                setDateFilter('custom');
              }
            }}
          />
        )}
        {showStartDatePicker && (
          <DatePicker
            title="시작일"
            initialDate={startDate}
            onSelect={(date) => {
              setStartDate(date);
              setShowStartDatePicker(false);
              setShowPeriodModal(true);
            }}
            onClose={() => {
              setShowStartDatePicker(false);
              setShowPeriodModal(true);
            }}
          />
        )}
        {showEndDatePicker && (
          <DatePicker
            title="종료일"
            initialDate={endDate}
            onSelect={(date) => {
              setEndDate(date);
              setShowEndDatePicker(false);
              setShowPeriodModal(true);
            }}
            onClose={() => {
              setShowEndDatePicker(false);
              setShowPeriodModal(true);
            }}
          />
        )}
      </AnimatePresence>
      <div className="px-4 mt-4 space-y-3 pb-20">
        {isLoading ? (
          <div className="text-center py-4 text-gray-400">불러오는 중...</div>
        ) : allPosts.length === 0 ? (
          <div className="text-center py-4 text-gray-400">반응한 글이 없습니다.</div>
        ) : (
          <>
            {allPosts.map((post) => (
              <ReactionPostCard
                key={post.postId}
                category={post.topicInfo.categoryName}
                question={post.topicInfo.topicName}
                reaction={post.summary}
                date={formatDate(post.updatedAt)}
                onClick={() => navigate(`/postdetail/${post.postId}`)}
              />
            ))}
            <div ref={loadMoreRef} className="h-6" />
            {isFetchingNextPage && (
              <div className="text-center py-4 text-gray-400">불러오는 중...</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
