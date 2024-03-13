import { Navigate } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
