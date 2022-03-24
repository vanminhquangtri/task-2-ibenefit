import React from 'react';

const routes = [
  { path: '/login', element: React.lazy(() => import('layouts/Auth')) },
  { path: '/user', element: React.lazy(() => import('layouts/User')) },
  { path: '/', element: React.lazy(() => import('layouts/Home')) },
];

export default routes;
