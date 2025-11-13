import { Analytics } from '@vercel/analytics/react';

import { RouterProvider } from 'react-router-dom';
import { BottomSheetProvider } from './components/BottomSheet/BottomSheetProvider';
import { router } from './routes/router';

function App() {
  return (
    <BottomSheetProvider>
      <RouterProvider router={router} />
      <Analytics />
    </BottomSheetProvider>
  );
}

export default App;
