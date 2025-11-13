import { Analytics } from '@vercel/analytics/react';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
