import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from '../layout/HomeLayout';
import { MobileLayout } from '../layout/MobileLayout';
import { RootLayout } from '../layout/RootLayout';
import { Calendar } from '../pages/Calendar/Calendar';
import { CalendarPostView } from '../pages/Calendar/CalendarPostView';
import { Complement } from '../pages/Complement';
import { Complete } from '../pages/Complete';
import { Feed } from '../pages/Feed';
import { FeedBack } from '../pages/Feedback';
import { GatherTopic } from '../pages/GatherTopic';
import Home from '../pages/Home';
import { Notification } from '../pages/Notification';
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
import { PostDetail } from '../pages/PostDetail';
import { FeedbackView } from '../pages/Profile/FeedbackView';
import { MyInfo } from '../pages/Profile/MyInfo';
import { MyPosts } from '../pages/Profile/MyPosts';
import { MyReactions } from '../pages/Profile/MyReactions';
import { Profile } from '../pages/Profile/Profile';
import { Write } from '../pages/Write';
import { FeedbackLoading } from '../pages/Write/FeedbackLoading';

// 관리자 페이지
import { Admin } from '../pages/admin';
import { AddQuestion } from '../pages/admin/AddQuestion';
import { AddQuestionFailure } from '../pages/admin/AddQuestionFailure';
import { AddQuestionSuccess } from '../pages/admin/AddQuestionSuccess';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { NotFound } from '../pages/Error/NotFound';
import { TemporaryError } from '../pages/Error/TemporaryError';
import { PastTopic } from '../pages/Feed/PastTopic/PastTopic';

export const router = createBrowserRouter([
  // 홈 페이지
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
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
            path: 'admin',
            element: <Admin />,
          },
          {
            path: 'admin/login',
            element: <AdminLogin />,
          },
          {
            path: 'admin/add-question',
            element: <AddQuestion />,
          },
          {
            path: 'admin/add-question/success',
            element: <AddQuestionSuccess />,
          },
          {
            path: 'admin/add-question/failure',
            element: <AddQuestionFailure />,
          },

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
          {
            path: 'profile/my-reactions',
            element: <MyReactions />,
          },
          {
            path: 'profile/my-posts',
            element: <MyPosts />,
          },
          {
            path: 'profile/my-posts/feedbackview/:postId',
            element: <FeedbackView />,
          },
        ],
      },
      {
        path: '/',
        element: <MobileLayout showNavBar={true} />,
        children: [
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
        element: <MobileLayout showNavBar={false} />,
        children: [
          {
            path: 'calendar/post/:postId',
            element: <CalendarPostView />,
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
            path: '/feedback/:categoryName/:topicName/:topicType',
            element: <FeedBack />,
          },
          {
            path: '/complement/:categoryName/:topicName/:topicType',
            element: <Complement />,
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
          {
            path: 'notification',
            element: <Notification />,
          },
          {
            path: 'notfound',
            element: <NotFound />,
          },
          {
            path: 'temporaryerror',
            element: <TemporaryError />,
          },
          {
            path: 'feed/:topicId/:categoryId',
            element: <PastTopic />,
          },
        ],
      },
    ],
  },
]);
