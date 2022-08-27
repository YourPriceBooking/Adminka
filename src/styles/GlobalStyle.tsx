import { createGlobalStyle, css } from 'styled-components/macro';

import robotoLight from 'assets/fonts/roboto/roboto-lat-cyr-300.woff2';
import robotoRegular from 'assets/fonts/roboto/roboto-lat-cyr-regular.woff2';
import robotoMedium from 'assets/fonts/roboto/roboto-lat-cyr-500.woff2';
import robotoBold from 'assets/fonts/roboto/roboto-lat-cyr-700.woff2';

const fonts = css`
  /* robotoThin;robotoRegular;robotoMedium;robotoBold; */
  /* roboto-300 - latin_cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto'), url(${robotoLight}) format('woff2');
  }
  /* roboto-regular - latin_cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Regular'), local('Roboto'), url(${robotoRegular}) format('woff2');
  }
  /* roboto-500 - latin_cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto'), url(${robotoMedium}) format('woff2');
  }
  /* roboto-700 - latin_cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Bold'), local('Roboto'), url(${robotoBold}) format('woff2');
  }

  @font-face {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 200;
    src: local('Segoe UI Light'), local('Segoe UI');
  }
  @font-face {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 300;
    src: local('Segoe UI Semilight'), local('Segoe UI');
  }
  @font-face {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    src: local('Segoe UI'), local('Segoe UI');
  }
  @font-face {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    src: local('Segoe UI Semibold'), local('Segoe UI');
  }
  @font-face {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    src: local('Segoe UI Bold'), local('Segoe UI');
  }
`;

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  ${/* sc-tag */ fonts}

  html {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  body {
    height: 100vh;
    overflow: hidden;
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

  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  p,
  a {
    padding: 0;
    margin: 0;
  }

  ul,
  ol {
    list-style: none;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
