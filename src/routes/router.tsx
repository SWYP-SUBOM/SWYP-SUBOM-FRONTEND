import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import Calendar from '../pages/Calendar';
import Feed from '../pages/Feed';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

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
    ],
  },
]);
