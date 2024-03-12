import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { TransactionsProvider } from '../contexts/TransactionsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TransactionsProvider>
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </TransactionsProvider>
  );
}
