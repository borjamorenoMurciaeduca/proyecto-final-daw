import LayoutNotLogged from '@/layout/LayoutNotLogged';
import Register from '@/pages/register/Register';

const LayoutRoutes = [
  {
    element: <LayoutNotLogged />,
    children: [
      { index: true, element: <Register /> },
      { path: '*', element: <>Not Found</> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
