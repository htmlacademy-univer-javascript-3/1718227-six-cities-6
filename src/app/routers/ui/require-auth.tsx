import { getRouteLogin } from '@/shared/const/router';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = false;

  if (!auth) {
    return <Navigate to={getRouteLogin()} replace />;
  }

  return children;
}
