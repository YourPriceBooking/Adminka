import { useCustomTheme } from 'hooks/ui/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { AppRouter } from 'routes/AppRouter';

export default function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppStyled className="App">
        <AppRouter />
      </AppStyled>
    </ThemeProvider>
  );
}
