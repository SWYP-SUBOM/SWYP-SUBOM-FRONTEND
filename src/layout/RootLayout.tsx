import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { BottomSheetProvider } from '../components/BottomSheet/BottomSheetProvider';
import { useNotificationStream } from '../hooks/Notification/useNotificationStream';
import { GAPageView } from '../utils/GAPageView';

export const RootLayout = () => {
  useNotificationStream();

  return (
    <BottomSheetProvider>
      <Outlet />
      <GAPageView />
      <Toaster />
    </BottomSheetProvider>
  );
};
