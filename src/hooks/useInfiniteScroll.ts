import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  rootMargin?: string;
}

export const useInfiniteScroll = <T>({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = '200px',
}: UseInfiniteScrollProps<T>) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

  return observerRef;
};
