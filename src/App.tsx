import { Providers } from './providers/providers';
import { GlobalStyle } from './styles/global';
import { Routes } from './routes';
import { GlobalToast } from './styles/toast';
import 'react-toastify/dist/ReactToastify.css';
import { useWindowSize } from './hooks/useWindowSize';

export function App() {
  const { width } = useWindowSize();
  return (
    <Providers>
      <GlobalToast
        autoClose={3000}
        position="bottom-center"
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        draggable={false}
        icon={false}
        width={width}
      />
      <GlobalStyle />
      <Routes />
    </Providers>
  );
}

export default App;
