import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import AuthGuard from './guard/auth.guard';
import app from './routes/app';
import auth from './routes/auth';

const router = createBrowserRouter([
  { path: '/app', element: <AuthGuard />, children: app },
  { path: '/auth', children: auth },
  { path: '/register', children: auth },
  { path: '*', element: <Navigate to="/app" /> },
]);

const Index = () => <RouterProvider router={router} />;

export default Index;
