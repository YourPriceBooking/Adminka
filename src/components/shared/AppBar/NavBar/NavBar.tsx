import { useLocation } from 'react-router-dom';
import { NavBarStyled, NavLinkStyled, NavListStyled } from './NavBar.styled';

export const NavBar = () => {
  const location = useLocation();

  return (
    <NavBarStyled>
      <NavListStyled>
        <li>
          <NavLinkStyled to="/" state={location}>
            Login
          </NavLinkStyled>
        </li>

        <li>
          <NavLinkStyled to="/country/:id" state={location}>
            Countries
          </NavLinkStyled>
        </li>
      </NavListStyled>
    </NavBarStyled>
  );
};
