import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { AppLoading } from 'components/App/App.styled';
import { AppRouter } from 'routes/AppRouter';
import { getRefs } from 'utils';

const { rootRef } = getRefs();

if (!rootRef) {
  throw new Error(`Please add 'div' with id="root" to index.html`);
}

const root = createRoot(rootRef);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<AppLoading />}>
        <BrowserRouter>
          <AppRouter />
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
