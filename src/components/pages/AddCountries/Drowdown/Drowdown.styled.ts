import styled from 'styled-components/macro';

export const DropdownStyled = styled.div`
  position: absolute;
  top: 100%;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 10px;
`;
