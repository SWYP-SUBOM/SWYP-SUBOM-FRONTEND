interface GAEventParams {
  [key: string]: string | number | boolean | undefined;
}

export const sendGAEvent = (eventName: string, eventParams?: GAEventParams) => {
  if (!window.gtag) return;

  if (import.meta.env.DEV) {
    console.log('[GA Event]', eventName, eventParams);
  }

  try {
    window.gtag('event', eventName, eventParams);
    if (import.meta.env.DEV) {
      console.log('[GA Event]', eventName, eventParams);
    }
  } catch (error) {
    console.error('[GA Event Error]', error);
  }
};

export const GAEvents = {
  // 1. 온보딩 / 로그인
  onboardingView: () => sendGAEvent('onboarding_view'),
  onboardingComplete: () => sendGAEvent('onboarding_complete'),
  loginClick: () => sendGAEvent('login_click'),
  loginSuccess: () => sendGAEvent('login_success'),

  // 2. 주제 탐색 / 선택
  topicListView: () => sendGAEvent('topic_list_view'),
  topicClick: (categoryName: string) => sendGAEvent('topic_click', { category_name: categoryName }),
  topicSelect: (topicId?: number, topicName?: string) =>
    sendGAEvent('topic_select', {
      ...(topicId && { topic_id: topicId }),
      ...(topicName && { topic_name: topicName }),
    }),
} as const;
