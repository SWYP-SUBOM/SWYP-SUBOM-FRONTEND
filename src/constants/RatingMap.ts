import aPen from '../assets/Rating/a-pen.svg';
import bPen from '../assets/Rating/b-pen.svg';
import cPen from '../assets/Rating/c-pen.svg';
import dPen from '../assets/Rating/d-pen.svg';
import fPen from '../assets/Rating/f-pen.svg';

export const RatingMap = {
  A: {
    title: '대단해요!',
    description: '글의 완성도가 아주 높아요',
    image: aPen,
  },
  B: {
    title: '멋져요!',
    description: '글이 전반적으로 잘 쓰였어요',
    image: bPen,
  },
  C: {
    title: '잘하고 있어요!',
    description: '피드백을 참고해 보완해봐요',
    image: cPen,
  },
  D: {
    title: '괜찮아요!',
    description: '조금 다듬어보면 좋아질 거에요',
    image: dPen,
  },
  F: {
    title: '아직은 아쉬워요!',
    description: '차근차근 다시 써볼까요?',
    image: fPen,
  },
};
