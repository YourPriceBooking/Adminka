import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveTheme } from 'redux/slices';
import { breakpoints, dark, fonts, light, shadows, transition } from 'styles/theme/theme';
import { DefaultTheme } from 'styled-components';

export const useCustomTheme = () => {
  const activeTheme = useAppSelector(selectActiveTheme);

  const theme: DefaultTheme = useMemo(
    () => ({
      breakpoints,
      fonts,
      colors: activeTheme === 'dark' ? dark : light,
      shadows,
      transition,
    }),
    [activeTheme]
  );

  return theme;
};
