import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      mobile: string;
      preTablet: string;
      tablet: string;
      preDesktop: string;
      desktop: string;
    };

    fonts: {
      roboto: string;
      segoe: string;
    };

    colors: {
      main: string;
      accent: string;
      active: string;
      secondary: string;
      bg: {
        body: string;
      };
      white: string;
      black: string;
      linkBorder: string;
    };

    shadows: {
      quarterBlack: string;
    };

    transition: {
      shorter: string;
      short: string;
      fast: string;
      normal: string;
    };
  }
}

export const breakpoints = {
  mobile: '320px',
  preTablet: '767px',
  tablet: '768px',
  preDesktop: '1199px',
  desktop: '1200px',
};

export const fonts = {
  roboto: "'Roboto', sans-serif",
  segoe: "'Segoe UI', sans-serif",
};

export const light = {
  accent: '#ff6000',
  active: '#2196f3',
  main: '#212121',
  bg: { body: '#C1D5E4' },
  secondary: '#282c34',
  white: '#ffffff',
  black: '#000000',
  linkBorder: '#787878',
};

export const dark = {
  accent: '#ff6000',
  active: '#2196f3',
  main: '#eeeeee',
  bg: { body: '#282c34' },
  secondary: '#282c34',
  white: '#ffffff',
  black: '#000000',
  linkBorder: '#787878',
};

export const shadows = {
  quarterBlack: 'rgba(0, 0, 0, 0.25)',
};

const cubic = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const transition = {
  shorter: `85ms ${cubic}`,
  short: `110ms ${cubic}`,
  fast: `160ms ${cubic}`,
  normal: `250ms ${cubic}`,
};
