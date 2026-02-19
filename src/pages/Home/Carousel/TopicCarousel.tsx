import { animate, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import play from '../../../assets/Home/play.svg';
import stop from '../../../assets/Home/stop.svg';
import { CATEGORIES } from '../../../constants/Categories';
import { useGetDailyQuestions } from '../../../hooks/Home/useGetDailyQuestions';
import { DailyTopicBox } from './DailyTopicBox';

export const TopicCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { data: dailyQuestionsData } = useGetDailyQuestions();

  const totalSlides = CATEGORIES.length;
  const extendedCategories = useMemo(() => [...CATEGORIES, ...CATEGORIES, ...CATEGORIES], []);

  // 초기 위치 잡기 및 무한 루프 감지 (기존 handleScroll 로직 활용)
  const handleUpdate = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, offsetWidth, scrollWidth } = container;
    const singleSetWidth = scrollWidth / 3;

    // 무한 루프 보정
    if (scrollLeft < singleSetWidth - offsetWidth) {
      container.scrollLeft += singleSetWidth;
    } else if (scrollLeft > singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }

    // 센터 인덱스 계산
    const children = Array.from(container.children) as HTMLElement[];
    const centers = children.map((c) => c.offsetLeft + c.offsetWidth / 2 - offsetWidth / 2);
    const closestIndex = centers.reduce(
      (prev, curr, idx) =>
        Math.abs(curr - scrollLeft) < Math.abs(centers[prev] - scrollLeft) ? idx : prev,
      0,
    );

    const actualIndex = closestIndex % CATEGORIES.length;
    if (activeIndex !== actualIndex) {
      setActiveIndex(actualIndex);
    }
  };

  const scrollTo = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container || !isPlaying) return;

      const children = Array.from(container.children) as HTMLElement[];
      // 중앙 세트의 해당 인덱스로 이동
      const targetIdx = totalSlides + (index % totalSlides);
      const targetScroll =
        children[targetIdx].offsetLeft +
        children[targetIdx].offsetWidth / 2 -
        container.offsetWidth / 2;

      animate(container.scrollLeft, targetScroll, {
        type: 'spring',
        stiffness: 150,
        damping: 25,
        onUpdate: (latest) => {
          container.scrollLeft = latest;
          handleUpdate();
        },
      });
    },
    [handleUpdate, totalSlides],
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        scrollTo(activeIndex + 1);
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeIndex, scrollTo]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const firstRealItem = container.children[CATEGORIES.length] as HTMLElement;
      const initialScroll =
        firstRealItem.offsetLeft + firstRealItem.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollLeft = initialScroll;
    }
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, offsetWidth } = container;
    const children = Array.from(container.children) as HTMLElement[];
    const centers = children.map((c) => c.offsetLeft + c.offsetWidth / 2 - offsetWidth / 2);

    // 가속도(velocity)를 계산해 타겟 결정 (안드로이드 휙 넘어감 방지 핵심)
    const velocity = info.velocity.x;
    let closestIndex = centers.reduce(
      (prev, curr, idx) =>
        Math.abs(curr - scrollLeft) < Math.abs(centers[prev] - scrollLeft) ? idx : prev,
      0,
    );

    // 세게 밀었을 때 한 칸만 더 가도록 제한
    if (velocity < -500) closestIndex += 1;
    if (velocity > 500) closestIndex -= 1;

    const targetScroll = centers[Math.max(0, Math.min(closestIndex, centers.length - 1))];

    animate(container.scrollLeft, targetScroll, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => {
        container.scrollLeft = latest;
        handleUpdate();
      },
      onComplete: () => {
        setIsPlaying(true);
      },
    });
  };

  return (
    <div className="relative w-full bg-transparent overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex items-center pl-3 pr-1 py-1 rounded-[99px] bg-[#222329]/35 backdrop-blur-sm C01_SB"
        >
          <div className="flex items-center gap-1 mr-1">
            <span className="text-white">{activeIndex + 1}</span>
            <span className="text-gray-500">/ {totalSlides}</span>
          </div>
          <div className="w-5 h-5 flex items-center justify-center cursor-pointer">
            <img
              src={isPlaying ? stop : play}
              alt={isPlaying ? 'stop' : 'play'}
              className="w-full h-full"
            />
          </div>
        </button>
      </div>
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDrag={(_, info) => {
          if (containerRef.current) {
            containerRef.current.scrollLeft -= info.delta.x;
            handleUpdate();
          }
        }}
        onDragEnd={handleDragEnd}
        className="
          flex items-start overflow-x-hidden 
          w-full
          cursor-grab active:cursor-grabbing select-none
          touch-none
        "
      >
        {extendedCategories.map((category, index) => {
          const isCenter = activeIndex === index % CATEGORIES.length;
          const matchedTopic = dailyQuestionsData?.topics.find(
            (t) => t.categoryId === category.categoryId,
          );

          return (
            <motion.div
              key={`${category.categoryId}-${index}`}
              animate={{ opacity: isCenter ? 1 : 0.6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              /* snap-always: 세게 밀어도 하나씩 걸리게 함 */
              className="w-full snap-center snap-always shrink-0 self-stretch "
            >
              <div className="pointer-events-auto">
                <DailyTopicBox
                  categoryId={category.categoryId}
                  categoryName={category.name}
                  isActive={isCenter}
                  topicName={matchedTopic?.topicName}
                  topicId={matchedTopic?.topicId}
                  topicType={matchedTopic?.topicType}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
