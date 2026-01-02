import { motion } from 'framer-motion';
import emptyStar from '../../../assets/Rating/empty-star.svg';
import fillStar from '../../../assets/Rating/fill-star.png';
import type { Grade } from '../../../constants/Grade';

type Props = {
  grade: Grade;
};

const STAR_COUNT = 5;
const STAR_SIZE = 57;
const STAR_GAP = 8;
const MAX_HEIGHT = 94;
const CURVE_HEIGHT = 45;

const GRADE_TO_STAR: Record<Grade, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  F: 1,
};

export function CurvedStarRating({ grade }: Props) {
  const rating = GRADE_TO_STAR[grade];
  const centerIndex = (STAR_COUNT - 1) / 2;

  return (
    <div
      className="relative mx-auto pointer-events-none"
      style={{
        width: STAR_COUNT * STAR_SIZE + (STAR_COUNT - 1) * STAR_GAP,
        height: MAX_HEIGHT,
      }}
    >
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const filled = i < rating;
        const x = i * (STAR_SIZE + STAR_GAP);
        const distanceFromCenter = Math.abs(i - centerIndex);
        const y = CURVE_HEIGHT * (distanceFromCenter / centerIndex) ** 2;

        return (
          <motion.img
            key={i}
            src={filled ? fillStar : emptyStar}
            className="absolute"
            style={{
              width: STAR_SIZE,
              height: STAR_SIZE,
              top: y,
              left: x,
            }}
            initial={{ scale: 0.5, opacity: 0, x: -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{
              delay: i * 0.15,
              type: 'spring',
              stiffness: 150,
              damping: 15,
            }}
          />
        );
      })}
    </div>
  );
}
