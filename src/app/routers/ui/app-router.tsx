import { AppRoutesProps } from '@/shared/types/router';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './require-auth';

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
    </Routes>
  );
};

export default AppRouter;
