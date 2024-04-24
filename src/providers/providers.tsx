import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { InstallmentsProvider } from '../contexts/InstallmentContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { UsersProvider } from '../contexts/UsersContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InstallmentsProvider>
          <UsersProvider>
            <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
          </UsersProvider>
        </InstallmentsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
