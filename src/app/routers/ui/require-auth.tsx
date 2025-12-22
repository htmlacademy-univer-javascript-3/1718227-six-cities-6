import { getRouteLogin } from '@/shared/const/router';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/redux';
import { AuthorizationStatus } from '@/entities/user';
import { Spinner } from '@/shared/ui';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={getRouteLogin()} state={{ from: location }} replace />;
  }

  return children;
}
