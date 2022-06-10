import styled from 'styled-components/macro';

import { ReactComponent as IconPencil } from 'assets/icons/iconEdit.svg';

type ButtonEdit = { isFirstEdit: boolean };

export const PencilButton = styled.button`
  color: ${({ isFirstEdit }: ButtonEdit) => (isFirstEdit ? 'orange' : 'grey')};
  padding: 20px;
`;

export const IconEdit = styled(IconPencil)`
  width: 24px;
  height: 22px;
  fill: currentColor;
`;
