import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from 'App';

import styled from 'styled-components/macro';

const root = createRoot(document.getElementById('root') as HTMLElement);

const Loading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #212121;

  /* animation: 500ms rotate infinite; */

  /* @keyframes rotate {
    from {
      transform: rotate3d(0, 0, 0, 0deg);
    }
    to {
      transform: rotate3d(0, 0, 0, 360deg);
    }
  } */
`;

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import reportWebVitals from './tests/reportWebVitals';
// reportWebVitals(console.log);
