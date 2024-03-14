import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useContextSelector(AuthContext, (context) => {
    return context.user;
  });
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
