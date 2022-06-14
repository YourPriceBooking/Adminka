import { useCustomTheme } from 'hooks/ui/theme';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { AppRouter } from 'routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppStyled className="App">
        <AppRouter />
      </AppStyled>

      <ToastContainer autoClose={2800} />
    </ThemeProvider>
  );
}
