import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import Feed from '../pages/Feed';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { SplashScreen } from '../pages/Onboarding/Introduction/SplashScreen';
import { ServiceIntro1 } from '../pages/Onboarding/Introduction/ServiceIntro1';
import { ServiceIntro2 } from '../pages/Onboarding/Introduction/ServiceIntro2';
import { NameInput } from '../pages/Onboarding/Authentication/NameInput';
import { Login } from '../pages/Onboarding/Authentication/Login';
import { SplashMessage } from '../pages/Onboarding/FeatureTour/SplashMessage';
import { GuideScreen1 } from '../pages/Onboarding/FeatureTour/GuideScreen1';
import { GuideScreen2 } from '../pages/Onboarding/FeatureTour/GuideScreen2';
import { GuideScreen3 } from '../pages/Onboarding/FeatureTour/GuideScreen3';
import { GuideScreen4 } from '../pages/Onboarding/FeatureTour/GuideScreen4';
3;
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

  {
    path: '/calendar',
    element: <HomeLayout showHeaderVar={false} />,
    children: [
      {
        path: '',
        element: <Calendar />,
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
        path: '2',
        element: <Login />,
      },
      {
        path: '3',
        element: <GuideScreen3 />,
      },
      {
        path: '4',
        element: <NameInput />,
      },

      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);
