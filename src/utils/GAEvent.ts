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

  // 3. 글쓰기
  writeView: () => sendGAEvent('write_view'),
  writingStart: (opinion: string) => sendGAEvent('writing_start', { opinion }),
  tempSave: () => sendGAEvent('temp_save'),
  writingGuideClick: () => sendGAEvent('writing_guide_click'),

  // 4.AI 피드백 / 보완하기
  aiFeedbackClick: () => sendGAEvent('ai_feedback_click'),
  aiFeedbackView: () => sendGAEvent('ai_feedback_view'),
  reviseClick: () => sendGAEvent('revise_click'),
  writingComplete: () => sendGAEvent('writing_complete'),
  reviseView: () => sendGAEvent('revise_view'),
  reviseEditStart: () => sendGAEvent('revise_edit_start'),
  reviseExit: () => sendGAEvent('revise_exit'),
  reviseEditComplete: () => sendGAEvent('revise_edit_complete'),

  // 캘린더
  calendarView: () => sendGAEvent('calendar_view'),
  calendarDateClick: (date: string) => sendGAEvent('calendar_date_click', { date }),
  calendarWritingView: (postId: number) =>
    sendGAEvent('calendar_writing_view', { post_id: postId }),
  calendarFeedbackView: () => sendGAEvent('calendar_feedback_view'),
  calendarExit: () => sendGAEvent('calendar_exit'),

  // 6. 피드
  feedView: () => sendGAEvent('feed_view'),
  feedExit: () => sendGAEvent('feed_exit'),

  feedScroll: () => sendGAEvent('feed_scroll'),
  feedCategoryClick: (categoryId: number, categoryName?: string) =>
    sendGAEvent('feed_category_click', {
      category_id: categoryId,
      ...(categoryName && { category_name: categoryName }),
    }),

  feedPostClick: (postId: number) => sendGAEvent('feed_post_click', { post_id: postId }),
  reactionClick: (reactionType: string) =>
    sendGAEvent('reaction_click', { reaction_type: reactionType }),
  reactionCancel: (reactionType: string) =>
    sendGAEvent('reaction_cancel', { reaction_type: reactionType }),

  topicArchiveClick: () => sendGAEvent('topic_archive_click'),
  pastTopicFeedView: (topicId: number) =>
    sendGAEvent('past_topic_feed_view', { topic_id: topicId }),

  // 7. 마이페이지
  mypageView: () => sendGAEvent('mypage_view'),
  mypageExit: () => sendGAEvent('mypage_exit'),
  profileManageView: () => sendGAEvent('profile_manage_view'),
  myReactionListView: () => sendGAEvent('my_reaction_list_view'),
  myReactionPostClick: (postId: number) =>
    sendGAEvent('my_reaction_post_click', { post_id: postId }),
  myWritingListView: () => sendGAEvent('my_writing_list_view'),
  myWritingPostClick: (postId: number) => sendGAEvent('my_writing_post_click', { post_id: postId }),
} as const;
