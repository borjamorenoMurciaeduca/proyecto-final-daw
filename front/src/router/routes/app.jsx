import Layout from '@/layout';
import Home from '@/pages/home/Home';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '', element: <Navigate to="/auth" /> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
