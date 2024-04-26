import Register from '@/pages/auth/register/Register';

const LayoutRoutes = [
  {
    // Component: Layout,
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
