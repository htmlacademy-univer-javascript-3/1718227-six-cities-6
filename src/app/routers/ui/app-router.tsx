import { AppRoutesProps } from '@/shared/types/router';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './require-auth';
import { getRouteNotFound } from '@/shared/const/router';

const AppRouter = () => {
  const renderRoute = (route: AppRoutesProps) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        route.authOnly ? (
          <RequireAuth>{route.element}</RequireAuth>
        ) : (
          route.element
        )
      }
    />
  );

  return (
    <Routes>
      {Object.values(routeConfig).map((route) => renderRoute(route))}
      <Route path="*" element={<Navigate to={getRouteNotFound()} replace />} />
    </Routes>
  );
};

export default AppRouter;
