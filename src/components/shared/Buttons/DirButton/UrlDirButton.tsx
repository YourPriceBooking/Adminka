import type { MouseEvent, ReactNode } from 'react';
import { UrlDirButtonStyled } from './UrlDirButton.styled';

type TUrlDirButton = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  children?: ReactNode;
  $isEnabled?: boolean;
  variable?: 'green' | 'purple';
};

export const UrlDirButton = ({
  onClick,
  type = 'button',
  disabled,
  children,
  $isEnabled = true,
  variable = 'green',
}: TUrlDirButton) => (
  <UrlDirButtonStyled
    type={type}
    disabled={disabled}
    onClick={onClick}
    $isEnabled={$isEnabled}
    style={{ background: variable }}
  >
    {children}
  </UrlDirButtonStyled>
);
