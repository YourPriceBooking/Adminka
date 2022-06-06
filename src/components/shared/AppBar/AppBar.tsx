import iconLogo from 'assets/icons/iconLogo.svg';
import { AppBarStyled, AppLogo } from './AppBar.styled';
import { NavBar } from './NavBar/NavBar';
import { ThemeSwitch } from 'components/shared/ThemeSwitch';

export const AppBar = () => {
  return (
    <AppBarStyled>
      <AppLogo src={iconLogo} alt="logo" />

      <NavBar />

      <ThemeSwitch />
    </AppBarStyled>
  );
};
