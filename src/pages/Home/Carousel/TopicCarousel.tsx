import { animate, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES } from '../../../constants/Categories';
import { useGetDailyQuestions } from '../../../hooks/Home/useGetDailyQuestions';
import { DailyTopicBox } from './DailyTopicBox';

export const TopicCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { data: dailyQuestionsData } = useGetDailyQuestions();

  const extendedCategories = useMemo(() => [...CATEGORIES, ...CATEGORIES, ...CATEGORIES], []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const firstRealItem = container.children[CATEGORIES.length] as HTMLElement;
      const initialScroll =
        firstRealItem.offsetLeft + firstRealItem.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollLeft = initialScroll;
    }
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || isDragging) return;

    const { scrollLeft, offsetWidth, scrollWidth } = container;
    const singleSetWidth = scrollWidth / 3;

    if (scrollLeft < singleSetWidth - offsetWidth) {
      container.scrollLeft += singleSetWidth;
    } else if (scrollLeft > singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }

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

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const targetIdx = CATEGORIES.length + index;
    const targetChild = children[targetIdx];

    const targetScroll =
      targetChild.offsetLeft + targetChild.offsetWidth / 2 - container.offsetWidth / 2;

    animate(container.scrollLeft, targetScroll, {
      type: 'spring',
      stiffness: 150,
      damping: 25,
      onUpdate: (latest) => (container.scrollLeft = latest),
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.scrollSnapType = 'x mandatory';

      const { scrollLeft, offsetWidth } = containerRef.current;
      const children = Array.from(containerRef.current.children) as HTMLElement[];
      const centers = children.map((c) => c.offsetLeft + c.offsetWidth / 2 - offsetWidth / 2);
      const closestIndex = centers.reduce(
        (prev, curr, idx) =>
          Math.abs(curr - scrollLeft) < Math.abs(centers[prev] - scrollLeft) ? idx : prev,
        0,
      );

      const targetScroll = centers[closestIndex];
      animate(containerRef.current.scrollLeft, targetScroll, {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        onUpdate: (latest) => {
          if (containerRef.current) containerRef.current.scrollLeft = latest;
        },
      });
    }
  };

  return (
    <div className="w-full bg-transparent overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="
          flex items-start gap-4 overflow-x-auto
          snap-x snap-mandatory px-[10%] py-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          cursor-grab select-none
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
              animate={{
                opacity: isCenter ? 1 : 0.6,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="snap-center shrink-0 w-[85%] max-w-[320px] min-h-[332px]"
            >
              <DailyTopicBox
                categoryId={category.categoryId}
                categoryName={category.name}
                isActive={isCenter}
                topicName={matchedTopic?.topicName}
                topicId={matchedTopic?.topicId}
                topicType={matchedTopic?.topicType}
              />
            </motion.div>
          );
        })}
      </div>

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
