import type { ReactNode, MouseEvent } from 'react';
import { ButtonContainer } from './Button.styled';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  active?: boolean;
  value?: any;
};

export const Button = ({ children, onClick, type = 'navigate', active, value }: ButtonProps) => (
  <ButtonContainer
    className={type}
    disabled={active}
    type="button"
    onClick={event => onClick(event)}
    value={value}
  >
    {children}
  </ButtonContainer>
);
