import { MouseEvent } from 'react';
import { IconPencil } from './EditButton.styled';

type Edit = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  $isFirstEdit: boolean;
};

export const EditButton = ({ onClick, disabled, $isFirstEdit }: Edit) => (
  <button onClick={onClick} type="button" disabled={disabled}>
    <IconPencil $isFirstEdit={$isFirstEdit} />
  </button>
);
