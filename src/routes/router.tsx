import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import { Complement } from '../pages/Complement';
import { Feed } from '../pages/Feed';
import { FeedBack } from '../pages/Feedback';
import { GatherTopic } from '../pages/GatherTopic';
import Home from '../pages/Home';
import { Login } from '../pages/Onboarding/Authentication/Login';
import { NameInput } from '../pages/Onboarding/Authentication/NameInput';
import { OAuthCallback } from '../pages/Onboarding/Authentication/OAuthCallback';
import { GuideScreen1 } from '../pages/Onboarding/FeatureTour/GuideScreen1';
import { GuideScreen2 } from '../pages/Onboarding/FeatureTour/GuideScreen2';
import { GuideScreen3 } from '../pages/Onboarding/FeatureTour/GuideScreen3';
import { GuideScreen4 } from '../pages/Onboarding/FeatureTour/GuideScreen4';
import { SplashMessage } from '../pages/Onboarding/FeatureTour/SplashMessage';
import { ServiceIntro1 } from '../pages/Onboarding/Introduction/ServiceIntro1';
import { ServiceIntro2 } from '../pages/Onboarding/Introduction/ServiceIntro2';
import { SplashScreen } from '../pages/Onboarding/Introduction/SplashScreen';

import { RootLayout } from '../layout/RootLayout';
import { Complete } from '../pages/Complete';
import { PostDetail } from '../pages/PostDetail';
import Profile from '../pages/Profile/Profile';
import MyInfo from '../pages/Profile/MyInfo';
import { Write } from '../pages/Write';
import { FeedbackLoading } from '../pages/Write/FeedbackLoading';

export const router = createBrowserRouter([
  // 홈 페이지
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/home',
        element: <HomeLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: '',
            element: <Profile />,
          },
        ],
      },
      // 앱 메인 (하단 바 포함)
      {
        path: '/',
        element: <MobileLayout showNavBar={false} />,
        children: [
          {
            path: '',
            element: <SplashScreen />,
          },
          {
            path: 'onboarding/intro1',
            element: <ServiceIntro1 />,
          },
          {
            path: 'onboarding/intro2',
            element: <ServiceIntro2 />,
          },
          {
            path: 'onboarding/Login',
            element: <Login />,
          },
          {
            path: 'onboarding/NameInput',
            element: <NameInput />,
          },
          {
            path: 'oauth2-jwt-header',
            element: <OAuthCallback />,
          },
          {
            path: 'onboarding/splashMessage',
            element: <SplashMessage />,
          },
          {
            path: 'onboarding/guideScreen1',
            element: <GuideScreen1 />,
          },
          {
            path: 'onboarding/guideScreen2',
            element: <GuideScreen2 />,
          },
          {
            path: 'onboarding/guideScreen3',
            element: <GuideScreen3 />,
          },
          {
            path: 'onboarding/guideScreen4',
            element: <GuideScreen4 />,
          },
          {
            path: 'calendar',
            element: <Calendar />,
          },
          {
            path: 'gathertopic',
            element: <GatherTopic />,
          },
          {
            path: 'loadingfeedback',
            element: <FeedbackLoading />,
          },
          {
            path: 'complete',
            element: <Complete />,
          },
          {
            path: 'profile/myinfo',
            element: <MyInfo />,
          },
        ],
      },
      {
        path: '/',
        element: <MobileLayout showNavBar={true} />,
        children: [
          {
            path: 'feed',
            element: <Feed />,
          },
          {
            path: '/postdetail/:postId',
            element: <PostDetail />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: '/',
        children: [
          {
            path: 'write',
            element: <Write />,
          },
          {
            path: '/feedback/:categoryName/:topicName',
            element: <FeedBack />,
          },
          {
            path: '/complement/:categoryName/:topicName',
            element: <Complement />,
          },
        ],
      },
      {
        path: 'feed',
        element: <Feed />,
      },
      {
        path: '/postdetail/:postId',
        element: <PostDetail />,
      },
      {
        path: 'gathertopic',
        element: <GatherTopic />,
      },
    ],
  },
]);
