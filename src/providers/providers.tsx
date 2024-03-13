import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { TransactionsProvider } from '../contexts/TransactionsContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
