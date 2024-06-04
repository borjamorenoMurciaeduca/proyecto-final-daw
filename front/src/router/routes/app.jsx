import Layout from '@/layout';
import AboutUs from '@/pages/about-us/AboutUs';
import App from '@/pages/app/App';
import FavoriteProperties from '@/pages/favorite-properties/FavoriteProperties';
import MyProperties from '@/pages/my-properties/MyProperties';
import Property from '@/pages/property/Property';
import Settings from '@/pages/settings/Settings';
import { Navigate } from 'react-router-dom';

const LayoutRoutes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'my-properties', element: <MyProperties /> },
      { path: 'favorite-properties', element: <FavoriteProperties /> },
      { path: 'property/:property_id', element: <Property /> },
      { path: 'settings', element: <Settings /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: '*', element: <Navigate to="/auth" /> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
