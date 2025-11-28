const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getTokenExpiration = (token: string | null): number | null => {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (error) {
    return null;
  }
};

// 토큰이 만료되기 전인지 확인 (기본 2분 전)
export const isTokenExpiringSoon = (token: string | null, bufferMinutes: number = 2): boolean => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return false;

  const now = Date.now();
  const bufferMs = bufferMinutes * 60 * 1000;
  return expiration - now < bufferMs;
};

export const createRedirectUrl = (endpoint: string): string => {
  return `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
};
