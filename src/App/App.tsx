import { useCustomTheme } from 'hooks/ui/theme';
import { ThemeProvider } from 'styled-components/macro';
import { ScrollContainer } from 'components/shared/Container';
import { Layout } from 'components/Layout';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled, DevIndicator } from 'App/App.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from 'hooks/redux/hooks';
import { selectDev } from 'redux/slices';

const dev = process.env.NODE_ENV === 'development';

export const App = () => {
  const theme = useCustomTheme();

  const showDev = useAppSelector(selectDev);

  return (
    <ThemeProvider theme={theme}>
      <ScrollContainer>
        <GlobalStyle />

        <AppStyled className="App">
          <Layout />
        </AppStyled>

        {dev && showDev && <DevIndicator>DEV</DevIndicator>}
        <ToastContainer autoClose={2800} />
      </ScrollContainer>
    </ThemeProvider>
  );
};
