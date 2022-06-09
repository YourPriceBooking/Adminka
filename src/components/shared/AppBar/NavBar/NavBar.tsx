import { useTypedLocation } from 'hooks/navigation';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, NavBarStyled, NavListStyled } from './NavBar.styled';

import iconArrowLeft from 'assets/icons/iconArrowLeft.svg';

export const NavBar = () => {
  const location = useTypedLocation();
  const from = location.state?.from?.pathname || '/';

  const nav = useNavigate();
  const goBack = useCallback(() => nav(from, { replace: true }), [from, nav]);

  return (
    <NavBarStyled>
      <NavListStyled>
        <li>
          <BackButton onClick={goBack}>
            <img src={iconArrowLeft} alt="back" />
          </BackButton>
        </li>
      </NavListStyled>
    </NavBarStyled>
  );
};
