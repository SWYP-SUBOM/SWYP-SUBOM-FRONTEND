import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import { Complement } from '../pages/Complement';
import Feed from '../pages/Feed';
import { FeedBack } from '../pages/Feedback';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { Write } from '../pages/Write';

export const router = createBrowserRouter([
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
    path: '/',
    element: <MobileLayout />,
    children: [
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
