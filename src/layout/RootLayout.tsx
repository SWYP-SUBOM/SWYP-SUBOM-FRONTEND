import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { BottomSheetProvider } from '../components/BottomSheet/BottomSheetProvider';

export const RootLayout = () => {
  return (
    <BottomSheetProvider>
      <Outlet />
      <Toaster />
    </BottomSheetProvider>
  );
};
