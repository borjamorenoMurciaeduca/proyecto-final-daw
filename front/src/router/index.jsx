import SharedProperty from '@/pages/shared/SharedProperty';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AuthGuard from './guard/auth.guard';
import AppRoutes from './routes/app';
import AuthRoutes from './routes/auth';
import RegisterRoutes from './routes/register';

const router = createBrowserRouter([
  { path: '/app', element: <AuthGuard />, children: AppRoutes },
  { path: '/auth', children: AuthRoutes },
  { path: '/shared/:shared_url', element: <SharedProperty /> },
  { path: '/register', children: RegisterRoutes },
  { path: '*', element: <Navigate to="/app" /> },
]);

const Index = () => <RouterProvider router={router} />;

export default Index;
