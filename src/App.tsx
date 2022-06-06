import { useCustomTheme } from 'hooks/ui/theme/useTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { RouterConfig } from 'routes/RouterConfig';

export default function App() {
  const theme = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppStyled className="App">
        <RouterConfig />
      </AppStyled>
    </ThemeProvider>
  );
}
