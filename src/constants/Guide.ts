export const GUIDE_LOGICAL_TITLE = '논리형';
export const GUIDE_LOGICAL_SUBTITLE = '아래 내용을 참고하며 내 생각을 논리적으로\n정리해보세요';

export const GUIDE_QUESTION_TITLE = '질문형';
export const GUIDE_QUESTION_SUBTITLE =
  '질문에 대한 나만의 경험과 생각을 탐색하고,\n나의 관점을 정리해보세요';

export const GUIDE_LOGICAL = [
  { step: 1, title: '주장', description: '내 입장을 한 문장으로 정리해 보세요' },
  { step: 2, title: '근거', description: '주장을 뒷받침하는 근거를 구체적으로\n적어보세요' },
  {
    step: 3,
    title: '반론',
    description: '반대 의견을 짚어보고 반론을 덧붙여\n설득력을 높여보세요',
  },
  {
    step: 4,
    title: '결론',
    description: '전체 내용을 간단히 정리하며 핵심 메시\n지로 마무리하세요',
  },
];

export const GUIDE_QUESTION = [
  { step: 1, title: '경험', description: '질문과 연결되는 나만의 경험이나\n순간을 떠올려 보세요' },
  {
    step: 2,
    title: '감정',
    description: '그때 느낀 감정과 그런 감정이 든 이유에\n대해 적어보세요',
  },
  {
    step: 3,
    title: '생각과 의미',
    description: '그 경험이 나에게 어떤 생각이나 의미를\n남겼는지 정리해 보세요',
  },
  {
    step: 4,
    title: '태도와 관점',
    description: '이 질문에 대해 지금 내가 가진 생각이나\n태도를 정리해 보세요',
  },
];

export const GUIDE_MAP = {
  LOGICAL: {
    title: GUIDE_LOGICAL_TITLE,
    subtitle: GUIDE_LOGICAL_SUBTITLE,
    contents: GUIDE_LOGICAL,
  },
  QUESTION: {
    title: GUIDE_QUESTION_TITLE,
    subtitle: GUIDE_QUESTION_SUBTITLE,
    contents: GUIDE_QUESTION,
  },
};

type StepNumber = 1 | 2 | 3;

type StepData = {
  [key in StepNumber]: {
    q: string;
    p: string;
  };
};

export const STEP_MESSAGES: {
  LOGICAL: StepData;
  QUESTION: StepData;
} = {
  LOGICAL: {
    1: {
      q: '이 주제에 대해 당신은 어떤 입장인가요?',
      p: '주제에 대한 의견을 한 문장으로 정리해 보세요.',
    },
    2: {
      q: '그렇게 생각한 이유는 무엇인가요?',
      p: '경험, 기사, 통계, 주변 사례 등을 활용해 설명해보세요.',
    },
    3: {
      q: '마지막으로 강조하고 싶은 점은 무엇인가요?',
      p: '주제에 대해 강조하고 싶은 이야기로 글을 마무리해보세요.',
    },
  },
  QUESTION: {
    1: {
      q: '이 주제에 대해서 어떻게 생각하나요?',
      p: '주제에 대한 생각을 한 문장으로 정리해 보세요.',
    },
    2: {
      q: '그렇게 생각하게 된 이유나 경험이 있나요?',
      p: '이에 대한 계기나, 관련 경험이 있다면 함께 설명해주세요.',
    },
    3: {
      q: '마지막으로 강조하고 싶은 점은 무엇인가요?',
      p: '생각을 간단히 정리하며 핵심 메시지로 마무리해보세요.',
    },
  },
};
export type guideTopicType = keyof typeof GUIDE_MAP;
