import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Transactions } from '../pages/Transactions';
import { ProtectedRoute } from './components/ProtectedRoute';

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
          <Transactions />
        </ProtectedRoute>
      ),
    },
    {
      path: '/auth/login',
      element: <Login />,
    },
  ]);

  return routes;
}
