import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<route.element />} />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
