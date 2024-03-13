import { Providers } from './providers/providers';
import { GlobalStyle } from './styles/global';
import { Routes } from './routes';

export function App() {
  return (
    <Providers>
      <GlobalStyle />
      <Routes />
    </Providers>
  );
}

export default App;
