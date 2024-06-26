import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';
import { NotActiveUser } from '../../pages/Installments/components/NotActiveUser';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';

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

  if (user && !user?.isActive) {
    return <NotActiveUser user={user} />;
  }
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  );
};
