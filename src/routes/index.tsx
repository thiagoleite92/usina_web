import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { InstallmentsPage } from '../pages/Installments';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from '../pages/Register';

export function Routes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },

    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <InstallmentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/auth/login',
      element: <Login />,
    },
    {
      path: '/auth/cadastro',
      element: <Register />,
    },
  ]);

  return routes;
}
