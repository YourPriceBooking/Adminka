import styled from 'styled-components/macro';

export const AddDirButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 45px;
  padding: 12px;

  font-weight: 700;

  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 2px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonEditHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonEditActive};
    border-color: white;
  }
`;
