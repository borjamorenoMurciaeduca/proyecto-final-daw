import LayoutNotLogged from '@/layout/LayoutNotLogged';
import Register from '@/pages/register/Register';

const RegisterRoutes = [
  {
    element: <LayoutNotLogged />,
    children: [
      { index: true, element: <Register /> },
      { path: '*', element: <>Not Found</> },
    ],
  },
];

export default RegisterRoutes;
