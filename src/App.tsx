import { RouterConfig } from 'routes/RouterConfig';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import './App.scss';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterConfig />
      </div>
    </ThemeProvider>
  );
}
