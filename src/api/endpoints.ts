export const OAUTH_ENDPOINTS = {
  KAKAO_LOGIN: '/oauth2/authorization/kakao',
  OAUTH_JWT_HEADER: '/api/oauth2-jwt-header',
  LOGOUT: '/logout',
} as const;

export const USER_ENDPOINTS = {
  NAMING: '/api/naming',
  GET_NAMING: '/api/naming',
  ME: '/api/me',
  UNREGISTER: '/api/unregister',
} as const;

export const HOME_ENDPOINTS = {
  HOME: '/api/home',
} as const;

export const CATEGORY_ENDPOINTS = {
  GET_CATEGORY: '/api/categories',
} as const;

export const CALENDAR_ENDPOINTS = {
  GET_CALENDAR: '/api/calendar',
} as const;

export const POST_ENDPOINTS = {
  GET_POST: '/api/posts',
  MY_WRITINGS: '/api/posts/my-writings',
  MY_REACTIONS: '/api/posts/my-reactions',
} as const;

export const ENDPOINTS = {
  ...OAUTH_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...HOME_ENDPOINTS,
  ...CATEGORY_ENDPOINTS,
  ...CALENDAR_ENDPOINTS,
  ...POST_ENDPOINTS,
} as const;
