import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import { Complement } from '../pages/Complement';
import Feed from '../pages/Feed';
import { FeedBack } from '../pages/Feedback';
import Home from '../pages/Home';
import { SplashScreen } from '../pages/Onboarding/Introduction/SplashScreen';
import { ServiceIntro1 } from '../pages/Onboarding/Introduction/ServiceIntro1';
import { ServiceIntro2 } from '../pages/Onboarding/Introduction/ServiceIntro2';
import { Login } from '../pages/Onboarding/Authentication/Login';
import { NameInput } from '../pages/Onboarding/Authentication/NameInput';
import { OAuthCallback } from '../pages/Onboarding/Authentication/OAuthCallback';
import { SplashMessage } from '../pages/Onboarding/FeatureTour/SplashMessage';
import { GuideScreen1 } from '../pages/Onboarding/FeatureTour/GuideScreen1';
import { GuideScreen2 } from '../pages/Onboarding/FeatureTour/GuideScreen2';
import { GuideScreen3 } from '../pages/Onboarding/FeatureTour/GuideScreen3';
import { GuideScreen4 } from '../pages/Onboarding/FeatureTour/GuideScreen4';

import Profile from '../pages/Profile';
import { Write } from '../pages/Write';

export const router = createBrowserRouter([
  // 홈 페이지
  {
    path: '/home',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home />,
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
        path: 'onboarding/Nameinput',
        element: <NameInput />,
      },
      {
        path: 'oauth2-jwt-header',
        element: <OAuthCallback />,
      },
      {
        path: 'onboarding/splashmessage',
        element: <SplashMessage />,
      },
      {
        path: 'onboarding/guidescreen1',
        element: <GuideScreen1 />,
      },
      {
        path: 'onboarding/guidescreen2',
        element: <GuideScreen2 />,
      },
      {
        path: 'onboarding/guidescreen3',
        element: <GuideScreen3 />,
      },
      {
        path: 'onboarding/guidescreen4',
        element: <GuideScreen4 />,
      },

      {
        path: 'feed',
        element: <Feed />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
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
]);
