import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { useCallback } from 'react';
import { selectActiveTheme, setTheme } from 'redux/slices';
import {
  ThemeSwitchStyled,
  ThemeSwitchButtonLight,
  ThemeSwitchButtonDark,
} from './ThemeSwitch.styled';

export const ThemeSwitch = () => {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);
  const isDark = activeTheme === 'dark';
  const toggleTheme = useCallback(
    () => dispatch(setTheme(activeTheme === 'dark' ? 'light' : 'dark')),
    [activeTheme, dispatch]
  );

  return (
    <ThemeSwitchStyled>
      <ThemeSwitchButtonDark onClick={toggleTheme} type="button" disabled={isDark}>
        🌜
      </ThemeSwitchButtonDark>

      <ThemeSwitchButtonLight onClick={toggleTheme} type="button" disabled={!isDark}>
        🌞
      </ThemeSwitchButtonLight>
    </ThemeSwitchStyled>
  );
};
