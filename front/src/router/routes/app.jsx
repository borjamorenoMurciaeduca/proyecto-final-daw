import Layout from '@/layout';
import App from '@/pages/app/App';
import EditProfile from '@/pages/edit-profile/EditProfile';
import FavoriteProperties from '@/pages/favorite-properties/FavoriteProperties';
import MyProperties from '@/pages/my-properties/MyProperties';
import PropertyInfo from '@/pages/property-info/PropertyInfo';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'my-properties', element: <MyProperties /> },
      { path: 'favorite-properties', element: <FavoriteProperties /> },
      { path: 'property/:property_id', element: <PropertyInfo /> },
      { path: 'edit-profile', element: <EditProfile /> },
      { path: '*', element: <Navigate to="/auth" /> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
