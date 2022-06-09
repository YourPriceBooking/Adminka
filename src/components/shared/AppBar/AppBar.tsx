import { AppBarStyled } from './AppBar.styled';
import { NavBar } from './NavBar/NavBar';
import { ThemeSwitch } from 'components/shared/ThemeSwitch';

export const AppBar = () => {
  return (
    <AppBarStyled>
      <NavBar />

      <ThemeSwitch />
    </AppBarStyled>
  );
};
