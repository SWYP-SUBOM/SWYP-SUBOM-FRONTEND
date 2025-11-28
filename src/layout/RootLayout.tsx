import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { BottomSheetProvider } from '../components/BottomSheet/BottomSheetProvider';
import { useNotificationStream } from '../hooks/Notification/useNotificationStream';

export const RootLayout = () => {
  useNotificationStream();

  return (
    <BottomSheetProvider>
      <Outlet />
      <Toaster />
    </BottomSheetProvider>
  );
};
