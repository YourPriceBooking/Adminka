import { MouseEvent, ReactNode } from 'react';
import { AddDirButtonStyled } from './AddDirButton.styled';

type AddDirButtonType = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode;
};

export const AddDirButton = ({
  onClick,
  disabled,
  type = 'button',
  children,
}: AddDirButtonType) => (
  <AddDirButtonStyled onClick={onClick} type={type} disabled={disabled}>
    {children}
  </AddDirButtonStyled>
);
