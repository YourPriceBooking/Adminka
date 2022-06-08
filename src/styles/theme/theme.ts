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
      white: string;
      black: string;
      active: string;
      main: string;
      secondary: string;
      title: string;
      textAccent: string;
      textPrimary: string;
      textSecond: string;
      textThird: string;
      textFourth: string;
      countdown: string;
      editFirstTime: string;
      editSecondTime: string;

      bg: {
        body: string;
        section: string;
        buttonEdit: string;
      };

      bgTransparent: {
        buttonHover: string;
        buttonActive: string;
        buttonCopyHover: string;
        buttonCopyActive: string;
        bgInput: string;
        bgFormAddCountry: string;

        buttonEditHover: string;
        buttonEditActive: string;

        bgAgentSettingsHeader: string;
        buttonSaveDisabled: string;
        buttonSaveActive: string;

        buttonDeleteAccountHover: string;
        buttonCancelDelete: string;
        buttonCancelDeleteHover: string;
        buttonCancelDeleteActive: string;

        buttonSaveCountryDisabled: string;
        buttonSaveCountry: string;
        buttonSaveCountryHover: string;
        buttonSaveCountryActive: string;

        blackTransparentQuarter: string;
      };

      border: {
        input: string;
        bgBlockLink: string;
        buttonCopy: string;
        list: string;
      };

      borderTransparent: {
        bgSection: string;
        inputHover: string;
        inputFocus: string;
        bgBlock: string;
      };
    };

    shadows: {
      quarterBlack: string;
      notification: string;
      countrySelector: string;
      buttonCancel: string;
      cancelDeleteCard: string;
      modal: string;
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

const permanent = {
  white: '#ffffff',
  black: '#000000',
};

const currentlyNotAssigned = {
  active: '#2196f3',
  secondary: '#282c34',
  title: '#0090ff',
  textAccent: '#006bbe',
  textPrimary: '#656565',
  textSecond: '#ff6000',
  textThird: '#4c4c4c',
  textFourth: '#a5a5a5',
  countdown: '#ff001f',
  editFirstTime: '#ff931e',
  editSecondTime: '#9b9b9b',
};

export const light = {
  ...permanent,
  ...currentlyNotAssigned,
  main: '#212121',
  secondary: '#282c34',
  title: '#0090ff',
  textAccent: '#006bbe',
  textPrimary: '#656565',
  textSecond: '#ff6000',
  textThird: '#4c4c4c',
  textFourth: '#a5a5a5',
  countdown: '#ff001f',
  editFirstTime: '#ff931e',
  editSecondTime: '#9b9b9b',
};

export const border = {
  input: '#d0d0d0',
  bgBlockLink: '#c9c9c9',
  buttonCopy: '#09dd1e',
  list: '#787878',
};

export const borderTransparent = {
  bgSection: 'rgba(0, 0, 0, 0.18)',
  inputHover: `rgba(${light.textAccent}, 0.5)`,
  inputFocus: `rgba(${light.textAccent}, 0.7)`,
  bgBlock: `rgba(${border.input}, 0.5)`,
};

const bgNotAssigned = {
  section: '#f4f4f4',
  buttonEdit: '#dedede',
};

export const bgLight = {
  body: '#C1D5E4',
  ...bgNotAssigned,
};

const bgTransparentNotAssigned = {
  buttonHover: 'rgba(255, 96, 0, 0.9)',
  buttonActive: 'rgba(255, 96, 0, 0.75)',
  buttonCopyHover: 'rgba(106, 255, 121, 0.32)',
  buttonCopyActive: 'rgba(106, 255, 121, 0.8)',

  bgFormAddCountry: `rgba(${bgLight.body}, 0.33)`,

  buttonEditHover: `rgba(${bgLight.buttonEdit}, 0.6)`,
  buttonEditActive: `rgba(${bgLight.buttonEdit}, 0.9)`,

  bgAgentSettingsHeader: `rgba(${light.textAccent}, 0.05)`,
  buttonSaveDisabled: `rgba(${light.textAccent}, 0.39)`,
  buttonSaveActive: `rgba(${light.textAccent}, 0.8)`,

  buttonDeleteAccountHover: `rgba(${light.black}, 0.6)`,
  buttonCancelDelete: `rgba(${light.textThird}, 0.2)`,
  buttonCancelDeleteHover: `rgba(${light.textThird}, 0.28)`,
  buttonCancelDeleteActive: `rgba(${light.textThird}, 0.11)`,

  buttonSaveCountryDisabled: `rgba(${light.title}, 0.5)`,
  buttonSaveCountry: `rgba(${light.title}, 0.7)`,
  buttonSaveCountryHover: `rgba(${light.title}, 0.9)`,
  buttonSaveCountryActive: `rgba(${light.title}, 0.3)`,

  blackTransparentQuarter: `rgba(${light.black}, 0.25)`,
};

export const bgTransparentLight = {
  ...bgTransparentNotAssigned,
  bgInput: `rgba(${bgLight.section}, 0.5)`,
};

export const dark = {
  ...permanent,
  ...currentlyNotAssigned,
  main: bgLight.body,
};

export const bgDark = {
  body: '#282828',
  ...bgNotAssigned,
};

export const bgTransparentDark = {
  ...bgTransparentNotAssigned,
  bgInput: `rgba(${bgDark.section}, 0.5)`,
};

const quarterBlack = 'rgba(0, 0, 0, 0.25)';

export const shadows = {
  quarterBlack,
  notification: `0 0 4px ${quarterBlack}`,
  countrySelector: `0 0 9px 2px ${quarterBlack}`,
  buttonCancel: `0 0 5px 2px ${quarterBlack}`,
  cancelDeleteCard: `0 0 10px rgba(${light.black}, 0.3)`,
  modal: `0px 2px 4px rgba(${light.black}, 0.15)`,
};

const cubic = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const transition = {
  shorter: `85ms ${cubic}`,
  short: `110ms ${cubic}`,
  fast: `160ms ${cubic}`,
  normal: `250ms ${cubic}`,
};
