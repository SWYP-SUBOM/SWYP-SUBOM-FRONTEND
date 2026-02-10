import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { BottomSheetProvider } from '../components/BottomSheet/BottomSheetProvider';
import { useNotificationStream } from '../hooks/Notification/useNotificationStream';
import { useModal } from '../hooks/useModal';
import { GAPageView } from '../utils/GAPageView';

export const RootLayout = () => {
  useNotificationStream();
  const { isOpen, Content } = useModal();

  return (
    <BottomSheetProvider>
      <Outlet />
      <GAPageView />
      {isOpen && Content}
      <Toaster />
    </BottomSheetProvider>
  );
};
