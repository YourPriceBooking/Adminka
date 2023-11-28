import type { ReactNode, MouseEvent } from 'react';
import { ButtonContainer } from './Button.styled';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type: 'navigate';
};

export const Button = ({ children, onClick, type }: ButtonProps) => (
  <ButtonContainer className={type} type="button" onClick={event => onClick(event)}>
    {children}
  </ButtonContainer>
);
