import LayoutNotLogged from '@/layout/LayoutNotLogged';
import Login from '@/pages/auth/Login';

const AuthRoutes = [
  {
    element: <LayoutNotLogged />,
    children: [
      { index: true, element: <Login /> },
      { path: '*', element: <>Not Found</> },
    ],
  },
];

export default AuthRoutes;
