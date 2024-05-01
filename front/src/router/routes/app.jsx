import Layout from '@/layout';
import Home from '@/pages/home/Home';
import PropertyInfo from '@/pages/propertyInfo/PropertyInfo';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'property/:property_id', element: <PropertyInfo /> },
      { path: '', element: <Navigate to="/auth" /> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
