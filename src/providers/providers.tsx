import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { InstallmentsProvider } from '../contexts/InstallmentContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InstallmentsProvider>
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </InstallmentsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
