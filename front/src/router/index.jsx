import SharedProperty from '@/pages/sharedProperty/SharedProperty';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AuthGuard from './guard/auth.guard';
import app from './routes/app';
import auth from './routes/auth';
import register from './routes/register';

const router = createBrowserRouter([
  { path: '/app', element: <AuthGuard />, children: app },
  { path: '/auth', children: auth },
  { path: '/shared/:shared_url', element: <SharedProperty /> },
  { path: '/register', children: register },
  { path: '*', element: <Navigate to="/app" /> },
]);

const Index = () => <RouterProvider router={router} />;

export default Index;
