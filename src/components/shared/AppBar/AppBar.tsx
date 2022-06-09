import { AppBarStyled } from './AppBar.styled';
import { NavBar } from './NavBar/NavBar';
import { ThemeSwitch } from 'components/shared/ThemeSwitch';
import { useAppDispatch } from 'hooks/redux/hooks';
import { logout } from 'redux/slices';

export const AppBar = () => {
  const appDispatch = useAppDispatch();
  const onLogout = () => {
    appDispatch(logout());
  };

  return (
    <AppBarStyled>
      <NavBar />

      <button onClick={onLogout}>Logout</button>
      <ThemeSwitch />
    </AppBarStyled>
  );
};
