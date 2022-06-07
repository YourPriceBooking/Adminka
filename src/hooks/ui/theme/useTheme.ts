import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveTheme } from 'redux/slices';
import {
  breakpoints,
  fonts,
  dark,
  light,
  bg,
  bgTransparent,
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
        bg,
        bgTransparent,
        border,
        borderTransparent,
        ...(activeTheme === 'dark' ? dark : light),
      },
      shadows,
      transition,
    }),
    [activeTheme]
  );

  return theme;
};
