import { useTypedLocation } from 'hooks/navigation';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import iconArrowLeft from 'assets/icons/iconArrowLeft.svg';
import { BackButtonStyled } from './BackButton.styled';

export const BackButton = () => {
  const location = useTypedLocation();
  const from = location.state?.from?.pathname || '/';

  const nav = useNavigate();
  const goBack = useCallback(() => nav(from, { replace: true }), [from, nav]);

  return (
    <BackButtonStyled onClick={goBack}>
      <img src={iconArrowLeft} alt="back" />
    </BackButtonStyled>
  );
};
