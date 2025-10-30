import calendarIconActive from '../../assets/NavBar/calendar-active.svg';
import calendarIcon from '../../assets/NavBar/calendar.svg';
import feedIconActive from '../../assets/NavBar/feed-active.svg';
import feedIcon from '../../assets/NavBar/feed.svg';
import homeIconActive from '../../assets/NavBar/home-active.svg';
import homeIcon from '../../assets/NavBar/home.svg';
import profileIconActive from '../../assets/NavBar/profile-active.svg';
import profileIcon from '../../assets/NavBar/profile.svg';

import type { NavBarItem } from '../NavBar/NavBar.types';

export const NAVBAR_ITEMS: NavBarItem[] = [
  {
    menuName: '홈',
    icon: homeIcon,
    iconActive: homeIconActive,
    path: '/home',
  },
  {
    menuName: '피드',
    icon: feedIcon,
    iconActive: feedIconActive,
    path: '/feed',
  },
  {
    menuName: '캘린더',
    icon: calendarIcon,
    iconActive: calendarIconActive,
    path: '/calendar',
  },
  {
    menuName: '프로필',
    icon: profileIcon,
    iconActive: profileIconActive,
    path: '/profile',
  },
];
