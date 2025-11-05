import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import { Complement } from '../pages/Complement';
import Feed from '../pages/Feed';
import { FeedBack } from '../pages/Feedback';
import Home from '../pages/Home';
import { NameInput } from '../pages/Onboarding/Authentication/NameInput';
import { GuideScreen4 } from '../pages/Onboarding/FeatureTour/GuideScreen4';
import { ServiceIntro1 } from '../pages/Onboarding/Introduction/ServiceIntro1';
import { ServiceIntro2 } from '../pages/Onboarding/Introduction/ServiceIntro2';
import { SplashScreen } from '../pages/Onboarding/Introduction/SplashScreen';
import { PostDetail } from '../pages/PostDetail';
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
        path: '2',
        element: <ServiceIntro2 />,
      },
      {
        path: '3',
        element: <GuideScreen4 />,
      },
      {
        path: '4',
        element: <NameInput />,
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
