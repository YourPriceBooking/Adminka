import styled from 'styled-components/macro';
// buttonAddLocation;
export const AddDirButtonStyled = styled.button.attrs(
  ({ $isEnabled = false }: { $isEnabled?: boolean }) => ({
    $isEnabled,
  })
)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 30px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 10px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme, $isEnabled }) =>
    $isEnabled && theme.colors.bg.buttonAddDirHotelier};
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonEditHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonEditActive};
    border-color: white;
  }
`;
