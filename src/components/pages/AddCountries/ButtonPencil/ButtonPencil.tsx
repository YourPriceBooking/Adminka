import { ReactNode } from 'react';
import { PencilButton } from './ButtonPencil.styled';

type ButtonEdit = {
  children: ReactNode;
  edited: number;
  type: 'button' | 'submit' | 'reset' | undefined;
};

export const EditButton = ({ children, edited = 0, type = 'button', ...props }: ButtonEdit) => {
  return (
    <PencilButton type={type} isFirstEdit={!edited} {...props}>
      {children}
    </PencilButton>
  );
};
