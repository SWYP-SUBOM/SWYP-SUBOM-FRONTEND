import { animate, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES } from '../../../constants/Categories';
import { useGetDailyQuestions } from '../../../hooks/Home/useGetDailyQuestions';
import { DailyTopicBox } from './DailyTopicBox';

export const TopicCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: dailyQuestionsData } = useGetDailyQuestions();

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

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const firstRealItem = container.children[CATEGORIES.length] as HTMLElement;
      const initialScroll =
        firstRealItem.offsetLeft + firstRealItem.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollLeft = initialScroll;
    }
  }, []);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const targetIdx = CATEGORIES.length + index;
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
  };

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
    });
  };

  return (
    <div className="w-full bg-transparent overflow-hidden">
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
          flex items-start gap-4 overflow-x-hidden 
          px-[10%] py-4
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
              className="snap-center snap-always shrink-0 w-[85%] max-w-[320px] self-stretch pointer-events-none"
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

      <div className="flex justify-center gap-2 mt-4">
        {CATEGORIES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'bg-blue-600 w-4' : ' bg-gray-400 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
