import Layout from '@/layout';
import EditProfile from '@/pages/edit-profile/EditProfile';
import Home from '@/pages/home/Home';
import PropertyInfo from '@/pages/property-info/PropertyInfo';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'property/:property_id', element: <PropertyInfo /> },
      { path: 'edit-profile', element: <EditProfile /> },
      { path: '', element: <Navigate to="/auth" /> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
