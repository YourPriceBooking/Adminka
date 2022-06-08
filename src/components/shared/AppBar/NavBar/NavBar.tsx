import { useLocation } from 'react-router-dom';
import { routes } from 'routes/AppRouter';
import { NavBarStyled, NavLinkStyled, NavListStyled } from './NavBar.styled';

export const NavBar = () => {
  const location = useLocation();

  return (
    <NavBarStyled>
      <NavListStyled>
        {Object.entries(routes).map(([key, { path, name }]) => (
          <li key={key}>
            <NavLinkStyled to={path} state={location}>
              {name}
            </NavLinkStyled>
          </li>
        ))}
      </NavListStyled>
    </NavBarStyled>
  );
};
