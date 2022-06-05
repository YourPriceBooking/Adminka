import logo from 'assets/icons/logo.svg';
import { AppBarStyled, AppLogo } from './AppBar.styled';
import { NavBar } from './NavBar/NavBar';
import { ThemeSwitch } from 'components/shared/ThemeSwitch';

export const AppBar = () => {
  return (
    <AppBarStyled>
      <AppLogo src={logo} alt="logo" />

      <NavBar />

      <ThemeSwitch />
    </AppBarStyled>
  );
};
