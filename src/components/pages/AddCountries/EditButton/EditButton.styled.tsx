import { ReactComponent as IconEdit } from 'assets/icons/iconEdit.svg';
import styled from 'styled-components/macro';

export const IconPencil = styled(IconEdit).attrs(({ $isFirstEdit }: { $isFirstEdit: boolean }) => ({
  $isFirstEdit: $isFirstEdit,
}))`
  color: ${({ $isFirstEdit }) => ($isFirstEdit ? 'orange' : '#9B9B9B')};
`;
