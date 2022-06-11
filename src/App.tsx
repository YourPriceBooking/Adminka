import { useCustomTheme } from 'hooks/ui/theme';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { AppRouter } from 'routes/AppRouter';
// import { persistor } from 'redux/store';

export default function App() {
  const theme = useCustomTheme();
  // persistor.purge();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppStyled className="App">
        <AppRouter />
      </AppStyled>
    </ThemeProvider>
  );
}
