import { useCustomTheme } from 'hooks/ui/theme';
import { ThemeProvider } from 'styled-components/macro';
import { ScrollContainer } from 'components/shared/Container';

import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { AppRouter } from 'routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <ScrollContainer>
        <GlobalStyle />

        <AppStyled className="App">
          <AppRouter />
        </AppStyled>

        <ToastContainer autoClose={2800} />
      </ScrollContainer>
    </ThemeProvider>
  );
}
