import { useCustomTheme } from 'hooks/ui/theme';
import styled, { ThemeProvider } from 'styled-components/macro';
import { ScrollContainer } from 'components/shared/Container';

import { GlobalStyle } from 'styles/GlobalStyle';
import { AppStyled } from 'App.styled';
import { AppRouter } from 'routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { rgba } from 'polished';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectDev } from 'redux/slices';

const tomato = rgba('#cafe', 0.8);

export const DevIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 32px;

  background-color: ${tomato};

  transform: rotate(45deg);

  &::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: -32px;

    width: 0;
    height: 0;
    border-left: 32px solid transparent;
    border-bottom: 32px solid ${tomato};
  }

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    right: -32px;

    width: 0;
    height: 0;
    border-right: 32px solid transparent;
    border-bottom: 32px solid ${tomato};
  }
`;

const dev = process.env.NODE_ENV === 'development';

export const App = () => {
  const theme = useCustomTheme();

  const showDev = useAppSelector(selectDev);

  return (
    <ThemeProvider theme={theme}>
      <ScrollContainer>
        <GlobalStyle />

        <AppStyled className="App">
          <AppRouter />
        </AppStyled>

        {dev && showDev && <DevIndicator>DEV</DevIndicator>}
        <ToastContainer autoClose={2800} />
      </ScrollContainer>
    </ThemeProvider>
  );
};
