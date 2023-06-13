import React from 'react';
import { useNavigate } from 'react-router-dom';
import close from 'assets/icons/iconClose.svg';

import { DivClose, ButtonClos, Img } from './Components.styled';

export const ButtonClose: React.FC = () => {
  const nav = useNavigate();
  const closePage = () => nav(-1);
  return (
    <DivClose>
      <Img src={close} alt="" />
      <ButtonClos type="button" onClick={closePage}>
        Close
      </ButtonClos>
    </DivClose>
  );
};
