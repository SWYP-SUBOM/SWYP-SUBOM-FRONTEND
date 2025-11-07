export const OAUTH_ENDPOINTS = {
  KAKAO_LOGIN: '/oauth2/authorization/kakao',
  OAUTH_JWT_HEADER: '/api/oauth2-jwt-header',
} as const;

export const USER_ENDPOINTS = {
  NAMING: '/api/naming',
  GET_NAMING: '/api/naming',
} as const;

export const ENDPOINTS = {
  ...OAUTH_ENDPOINTS,
  ...USER_ENDPOINTS,
} as const;
