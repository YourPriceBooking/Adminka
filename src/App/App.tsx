import { useCustomTheme } from 'common/hooks';
import { ThemeProvider } from 'styled-components/macro';
import { ScrollContainer } from 'components/shared/Container';
import { Layout } from 'components/Layout';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled, DevIndicator } from 'App/App.styled';

import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from 'App';
import { selectDev } from 'features/countries';

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
        <ToastContainer position="bottom-center" autoClose={2800} transition={Flip} />
      </ScrollContainer>
    </ThemeProvider>
  );
};
