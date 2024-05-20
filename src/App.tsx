import { Providers } from './providers/providers';
import { GlobalStyle } from './styles/global';
import { Routes } from './routes';
import { GlobalToast } from './styles/toast';
import 'react-toastify/dist/ReactToastify.css';
import { useWindowSize } from './hooks/useWindowSize';
import { breakpoint } from './const/breakpoint';

export function App() {
  const { width } = useWindowSize();

  return (
    <Providers>
      <GlobalToast
        autoClose={3000}
        position={width && width <= breakpoint ? 'top-center' : 'bottom-right'}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        draggable={true}
        icon={false}
        width={width}
      />
      <GlobalStyle />
      <Routes />
    </Providers>
  );
}

export default App;
