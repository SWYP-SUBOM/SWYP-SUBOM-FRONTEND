# 써봄 : 나의 언어를 지키는 루틴 (Frontend)

![thumbnail](/public/Thumbnail.png)

AI 시대에 나만의 언어와 사고력을 키울 수 있는 글쓰기 루틴 서비스의 프론트엔드입니다.  
매일 원하는 주제를 골라 한 편의 글을 쓰고 AI 코치의 피드백을 통해 나의 글을 더욱 발전시켜 갈 수 있습니다.

## URL

https://www.seobom.site

## 프로젝트 소개

기간: 2025.10.04 ~ 2025.11.28(8주)  
팀원: PM(1), PD(2), FE(2), BE(3)

|                                      FE                                       |                                      FE                                       |                                      BE                                       |                                      BE                                       |                                      BE                                       |
| :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/70637743?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/66656181?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/57451700?v=4" width="120"/> | <img src="https://avatars.githubusercontent.com/u/225140439?v=4" width="90"/> | <img src="https://avatars.githubusercontent.com/u/132435321?v=4" width="90"/> |
|                      [태우](https://github.com/kim3360)                       |                      [현아](https://github.com/hyeon-aa)                      |                     [혜선](https://github.com/chunghye98)                     |                       [상준](https://github.com/im0x00)                       |                      [가영](https://github.com/pgy8404)                       |

## 핵심 기능

1. **사고력 훈련 기반 글쓰기**  
   논리적 사고와 확장적 사고로 구분된 5가지 주제 중 선택하여 글쓰기
2. **AI 피드백**  
   AI가 글의 완성도를 평가하고 논리·표현·구조 측면의 구체적인 피드백 제공
3. **피드**  
   다른 사용자의 글을 읽고 반응하며 생각을 공유하고 사고 확장
4. **캘린더**  
   기록이 채워지는 캘린더를 통해 성취감 제공
5. **카카오 로그인**  
   카카오 소셜 로그인으로 간편한 회원가입 및 로그인
6. **알림**  
   다른 사용자가 남긴 반응을 알림으로 받아 동기부여 강화

## Tech Stack

### Core

- **Language**: `TypeScript`
- **Framework**: `React 19.1.2`
- **Build Tool**: `Vite 7.1.7`
- **Package Manager**: `pnpm`

### State Management

- **Server State**: `TanStack Query (React Query) 5.90.5`
- **Client State**: `Zustand 5.0.8`

### Routing

- **Router**: `React Router DOM 7.9.4`

### Styling

- **CSS Framework**: `Tailwind CSS 4.1.16`
- **Animation**: `Framer Motion 12.23.24`

### HTTP Client

- **HTTP Library**: `Axios 1.13.2`

### Monitoring & Analytics

- **Error Tracking**: `Sentry React 10.32.1`
- **Analytics**: `Vercel Analytics 1.5.0`
- **Performance**: `Vercel Speed Insights 1.2.0`
- **Google Analytics**: Custom Implementation

### Development Tools

- **Component Development**: `Storybook 9.1.15`
- **Testing**: `Vitest 4.0.3`, `Playwright 1.56.1`
- **Linting**: `ESLint 9`
- **Formatting**: `Prettier 3.6.2`

### Utilities

- **Date Handling**: `date-fns 4.1.0`
- **Form Validation**: `Zod 4.1.12`
- **Calendar**: `react-calendar 6.0.0`
- **Notifications**: `react-hot-toast 2.6.0`
- **Animation**: `lottie-react 2.4.1`
- **SSE**: `eventsource-polyfill 0.9.6`

### Deployment

- **Platform**: `Vercel`

## 프로젝트 구조

```
src/
├── api/                    # API 관련
│   ├── endpoints.ts        # API 엔드포인트 정의
│   ├── services/          # API 서비스 함수
│   └── types/             # API 타입 정의
├── assets/                # 정적 리소스 (이미지, SVG 등)
├── components/            # 재사용 가능한 컴포넌트
│   ├── admin/            # 관리자 페이지 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── Modal/            # 모달 컴포넌트
│   └── Tabs/             # 탭 컴포넌트
├── constants/            # 상수 정의
├── hooks/                # 커스텀 훅
│   ├── Admin/            # 관리자 관련 훅
│   ├── Calendar/         # 캘린더 관련 훅
│   ├── Feed/             # 피드 관련 훅
│   ├── Post/             # 글 관련 훅
│   └── User/             # 사용자 관련 훅
├── layout/               # 레이아웃 컴포넌트
│   ├── FeedLayout.tsx
│   ├── HomeLayout.tsx
│   ├── MobileLayout.tsx
│   └── WriteLayout.tsx
├── pages/                # 페이지 컴포넌트
│   ├── admin/            # 관리자 페이지
│   ├── Calendar/         # 캘린더 페이지
│   ├── Feed/              # 피드 페이지
│   ├── Home/              # 홈 페이지
│   ├── Onboarding/        # 온보딩 페이지
│   ├── Profile/           # 프로필 페이지
│   └── Write/             # 글쓰기 페이지
├── routes/                # 라우팅 설정
│   ├── router.tsx
│   └── routes.ts
├── store/                 # 상태 관리 (Zustand)
│   ├── useAuthStore.ts
│   ├── useModalStore.tsx
│   └── useNotificationStore.ts
├── utils/                 # 유틸리티 함수
│   ├── apiClient.ts       # Axios 인스턴스 및 인터셉터
│   ├── GAEvent.ts         # Google Analytics 이벤트
│   └── GAPageView.tsx     # Google Analytics 페이지뷰
└── lib/                   # 라이브러리 설정
    └── sentry.ts          # Sentry 설정
```

## 주요 기능 구현

### 1. 인증 및 인가

- JWT 기반 인증
- Axios 인터셉터를 통한 자동 토큰 갱신
- 카카오 OAuth2 로그인

### 2. 상태 관리

- **TanStack Query**: 서버 상태 관리 및 캐싱
- **Zustand**: 클라이언트 상태 관리 (인증, 모달, 알림 등)

### 3. 라우팅

- React Router를 통한 SPA 라우팅
- Protected Routes 구현
- 동적 라우팅 지원

### 4. Google Analytics

- 페이지뷰 자동 추적
- 사용자 행동 이벤트 추적
- 개발 환경에서 콘솔 로그 출력

### 5. 에러 처리

- Sentry를 통한 에러 모니터링
- 전역 에러 바운더리
- API 에러 처리 및 재시도 로직

### 6. 반응형 디자인

- 모바일 우선 디자인
- Tailwind CSS를 활용한 반응형 레이아웃
- Visual Viewport API를 활용한 키보드 대응

### Project Architecture

![architecture](/public/architecture.png)

## 회고 및 고민한 점

1. [[스위프 웹 11기]NCP 활용 프로젝트 소개 - 써봄](https://545aa7.tistory.com/119)
