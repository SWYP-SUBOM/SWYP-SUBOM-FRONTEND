import { createPortal } from 'react-dom';
import type { Grade } from '../../../constants/Grade';
import { RatingMap } from '../../../constants/RatingMap';
import { CurvedStarRating } from './CurvedStarRating';

export function Rating({ grade }: { grade: Grade }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center max-w-[400px] mx-auto bg-[#121212]/70 backdrop-blur-[15px] z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-2 -translate-y-6">
          <div className="absolute -top-25 z-20">
            <CurvedStarRating grade={grade} />
          </div>
          <img src={RatingMap[grade].image} className="w-38 h-38" alt="gradepen" />
          <div className="T01_B text-[var(--color-b4)] ">{RatingMap[grade].title}</div>
          <div className="T02_B text-[var(--color-b4)] ">{RatingMap[grade].description}</div>
        </div>
      </div>
      <div className="absolute left-0 right-0 mt-120 text-center px-4">
        <div className="C01_M text-gray-100">
          *AI가 글의 논리,표현,구조를 <br />
          종합적으로 고려한 결과입니다.
        </div>
      </div>
    </div>,
    document.body,
  );
}
