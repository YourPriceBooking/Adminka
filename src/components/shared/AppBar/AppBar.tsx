import logo from 'assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import { AppBarStyled, NavBar, NavList } from './AppBar.styled';

export const AppBar = () => {
  const isActive = ({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#2196f3' : '' });

  return (
    <AppBarStyled>
      <img src={logo} className="App-logo" alt="logo" />

      <NavBar>
        <NavList>
          <li>
            <NavLink style={isActive} to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink style={isActive} to="/countries">
              Countries
            </NavLink>
          </li>

          {/* <li>
            <NavLink to="/menu">Menu</NavLink>
          </li> */}
        </NavList>
      </NavBar>
    </AppBarStyled>
  );
};
