import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { InstallmentsProvider } from '../contexts/InstallmentContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { ResidentsProvider } from '../contexts/ResidentsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InstallmentsProvider>
          <ResidentsProvider>
            <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
          </ResidentsProvider>
        </InstallmentsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
