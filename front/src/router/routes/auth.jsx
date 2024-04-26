import Login from '@/pages/auth/Login';

const LayoutRoutes = [
  {
    // Component: Layout,
    children: [
      { index: true, element: <Login /> },
      { path: '*', element: <>Not Found</> },
    ],
  },
];

export default [
  {
    children: LayoutRoutes,
  },
];
