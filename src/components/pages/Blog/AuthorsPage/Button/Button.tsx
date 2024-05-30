import type { ReactNode, MouseEvent } from 'react';
import { ButtonContainer } from './Button.styled';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  active?: boolean;
  value?: any;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'navigate',
  active,
  value,
}) => (
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
