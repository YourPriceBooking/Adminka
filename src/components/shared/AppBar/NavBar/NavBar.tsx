import { useLocation } from 'react-router-dom';
import { NavBarStyled, NavLinkStyled, NavListStyled } from './NavBar.styled';

export const NavBar = () => {
  const location = useLocation();

  return (
    <NavBarStyled>
      <NavListStyled>
        <li>
          <NavLinkStyled to="/" state={location}>
            Home
          </NavLinkStyled>
        </li>

        <li>
          <NavLinkStyled to="/countries" state={location}>
            Countries
          </NavLinkStyled>
        </li>

        {/* <li>
          <NavLinkStyled to="/menu" state={location}>
            Menu
          </NavLinkStyled>
        </li> */}
      </NavListStyled>
    </NavBarStyled>
  );
};
