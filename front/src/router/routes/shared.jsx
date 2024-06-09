import LayoutShared from '@/layout/LayoutShared';
import SharedProperty from '@/pages/shared/SharedProperty';

const SharedRoutes = [
  {
    element: <LayoutShared />,
    children: [
      { index: true, element: <SharedProperty /> },
      { path: '*', element: <>Not Found</> },
    ],
  },
];

export default SharedRoutes;
