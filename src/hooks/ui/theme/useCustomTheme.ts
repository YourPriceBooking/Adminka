import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveTheme } from 'redux/slices';
import {
  breakpoints,
  fonts,
  dark,
  light,
  bgLight,
  bgTransparentLight,
  bgDark,
  bgTransparentDark,
  border,
  borderTransparent,
  shadows,
  transition,
} from 'styles/theme/theme';
import { DefaultTheme } from 'styled-components';

export const partOfTheme = {};

export const useCustomTheme = () => {
  const activeTheme = useAppSelector(selectActiveTheme);

  const theme: DefaultTheme = useMemo(
    () => ({
      breakpoints,
      fonts,
      colors: {
        ...(activeTheme === 'dark' ? dark : light),
        bg: activeTheme === 'dark' ? bgDark : bgLight,
        bgTransparent: activeTheme === 'dark' ? bgTransparentDark : bgTransparentLight,
        border,
        borderTransparent,
      },
      shadows,
      transition,
    }),
    [activeTheme]
  );

  return theme;
};
