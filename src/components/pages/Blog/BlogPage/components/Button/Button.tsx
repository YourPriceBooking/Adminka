import type { ReactNode, MouseEvent } from 'react';
import { ButtonContainer } from './Button.styled';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'navigate';
  active?: boolean;
};

export const Button = ({ children, onClick, type = 'navigate', active }: ButtonProps) => (
  <ButtonContainer
    className={type}
    disabled={active}
    type="button"
    onClick={event => onClick(event)}
  >
    {children}
  </ButtonContainer>
);
