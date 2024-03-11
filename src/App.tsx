import { Providers } from './providers/providers';
import { GlobalStyle } from './styles/global';
import { Transactions } from './pages/Transactions';

export function App() {
  return (
    <Providers>
      <GlobalStyle />
      <Transactions />
    </Providers>
  );
}

export default App;
