import { useAppSelector } from 'App';
import { selectIsLoggedIn } from 'redux/slices';
import { AppBarStyled } from './AppBar.styled';
import { NavBar } from './NavBar/NavBar';

export const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? null : (
    <AppBarStyled>
      <NavBar />
    </AppBarStyled>
  );
};
