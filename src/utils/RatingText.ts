export const RatingText = (grade: string) => {
  switch (grade) {
    case 'S':
      return '대단해요!\n글의 완성도가 아주 높아요';
    case 'A':
      return '멋져요!\n글이 전반적으로 잘 쓰였어요';
    case 'B':
      return '잘하고 있어요!\n피드백을 참고해 보완해봐요';
    case 'C':
      return '괜찮아요!\n조금 다듬어보면 좋아질 거예요';
    case 'D':
    default:
      return '아직은 아쉬워요!\n차근차근 다시 써볼까요?';
  }
};
