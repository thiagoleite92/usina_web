import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
