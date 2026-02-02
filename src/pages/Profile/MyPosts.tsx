import { endOfDay, format, startOfDay, subDays, subMonths, subYears } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleHeader } from '../../components/common/TitleHeader.tsx';
import { useGetMyWritings } from '../../hooks/Profile/useGetMyWritings.ts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { useThemeColor } from '../../hooks/useThemecolor.ts';
import { GAEvents } from '../../utils/GAEvent';
import { MyPostCard } from './_components/MyPosts/MyPostCard.tsx';
import { DateFilterModal } from './_components/MyReactions/DateFilterModal.tsx';
import { DatePicker } from './_components/MyReactions/DatePicker.tsx';
import { FilterBar } from './_components/MyReactions/FilterBar.tsx';
import { PeriodSelectionModal } from './_components/MyReactions/PeriodSelectionModal.tsx';
import { SortFilterModal } from './_components/MyReactions/SortFilterModal.tsx';

type SortOption = 'latest' | 'oldest';
type DateOption = 'lastWeek' | 'lastMonth' | 'lastYear' | 'all' | 'custom';

export const MyPosts = () => {
  const navigate = useNavigate();
  useThemeColor('#eef1f4');
  const [sort, setSort] = useState<SortOption>('latest');

  useEffect(() => {
    GAEvents.myWritingListView();
  }, []);
  const [dateFilter, setDateFilter] = useState<DateOption>('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const dateRange = useMemo(() => {
    const now = new Date();
    let start: Date | null = null;
    let end: Date | null = null;

    switch (dateFilter) {
      case 'lastWeek': {
        start = startOfDay(subDays(now, 6));
        end = endOfDay(now);
        break;
      }
      case 'lastMonth': {
        start = startOfDay(subMonths(now, 1));
        end = endOfDay(now);
        break;
      }
      case 'lastYear': {
        start = startOfDay(subYears(now, 1));
        end = endOfDay(now);
        break;
      }
      case 'custom': {
        if (startDate) {
          start = startOfDay(startDate);
        }
        if (endDate) {
          end = endOfDay(endDate);
        }
        break;
      }
      case 'all':
      default:
        start = null;
        end = null;
    }

    return {
      startDate: start ? format(start, 'yyyy-MM-dd') : undefined,
      endDate: end ? format(end, 'yyyy-MM-dd') : undefined,
    };
  }, [dateFilter, startDate, endDate]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyWritings({
    size: 10,
    sort: sort === 'latest' ? 'latest' : 'oldest',
    ...(dateRange.startDate && { startDate: dateRange.startDate }),
    ...(dateRange.endDate && { endDate: dateRange.endDate }),
  });

  const getSortLabel = (sortOption: SortOption) => {
    return sortOption === 'latest' ? '최신순' : '오래된순';
  };

  const getDateLabel = (dateOption: DateOption) => {
    const labels: Record<DateOption, string> = {
      lastWeek: '최근 일주일',
      lastMonth: '최근 1달',
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
    <div className="flex flex-col min-h-screen ">
      <TitleHeader title="내가 쓴 글" headerWithNoalarm={true} />
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
          <div className="text-center py-4 text-gray-400">작성한 글이 없습니다.</div>
        ) : (
          <>
            {allPosts.map((post) => (
              <MyPostCard
                key={post.postId}
                category={post.topicInfo.categoryName}
                question={post.topicInfo.topicName}
                summary={post.summary}
                status={post.status}
                date={formatDate(post.updatedAt)}
                onClick={() => {
                  GAEvents.myWritingPostClick(post.postId);
                  navigate(`/profile/my-posts/feedbackview/${post.postId}`);
                }}
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
