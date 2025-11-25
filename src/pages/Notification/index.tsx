import { TitleHeader } from '../../components/common/TitleHeader';
import { useGetNotification } from '../../hooks/Notification/useGetNotification';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { NotificationBox } from './_components/NotificationBox';

export function Notification() {
  const {
    data: notificationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotification();

  const allNotifications = notificationData?.pages.flatMap((page) => page.notifications) ?? [];

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin: '300px',
  });

  return (
    <>
      <div
        className="
        max-w-[380px]
        mx-auto
        bg-gray-300
        relative
        shadow-[0_0_20px_rgba(0,0,0,0.1)]
        flex
        flex-col
        min-h-[100dvh]
        "
      >
        <TitleHeader title="알림" headerWithNoalarm />
        <div className="px-4">
          <div className="B01_B text-gray-900 pb-2.5">오늘의 알림</div>
          <div className="flex flex-col gap-[10px]">
            {allNotifications.map((notification) => (
              <div key={notification.notificationId}>
                <NotificationBox notification={notification} />
              </div>
            ))}
          </div>
          <div ref={loadMoreRef} className="h-6 " />
          {isFetchingNextPage && (
            <div className="text-center py-4 text-gray-400">불러오는 중...</div>
          )}
        </div>
      </div>
    </>
  );
}
