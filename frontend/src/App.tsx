import Chat from './components/Chat/Chat';
import Header from './components/shared/Header';
import { ThemeProviderWrapper } from './context/themeContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <ThemeProviderWrapper>
          <Header />
          <Chat />
        </ThemeProviderWrapper>
    </>
  );
}

export default App;