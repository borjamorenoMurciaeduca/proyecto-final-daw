import Layout from '@/layout';
import App from '@/pages/app/App';
import EditProfile from '@/pages/edit-profile/EditProfile';
import PropertyInfo from '@/pages/property-info/PropertyInfo';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
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
