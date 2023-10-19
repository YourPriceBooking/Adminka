import type { ReactNode, MouseEvent } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ children, onClick }: ButtonProps) => (
  <button type="button" onClick={event => onClick(event)}>
    {children}
  </button>
);
