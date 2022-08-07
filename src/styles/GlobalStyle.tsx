import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, ::before, ::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: ${({ theme }) => theme.colors.bg.body};
    transition: background-color ${({ theme }) => theme.transition[250]};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  h1, h2, h3, h4, ul, ol, li, p, a {
    padding: 0;
    margin: 0;
  }

  ul, ol {
    list-style: none;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
