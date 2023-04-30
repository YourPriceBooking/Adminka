import styled from 'styled-components/macro';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.btnBorder};
  border-radius: 5px;

  cursor: pointer;
  padding: 7px 48px;
  transition: ${({ theme }) => theme.transition[250]};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;

  &:hover {
    border: 0.5px solid ${({ theme }) => theme.colors.border.btnBorderHover};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.border.btnBorder};
  }
`;

// export const ButtonText = styled.p`
//   color: ${({ theme }) => theme.colors.textPrimary};
//   font-family: ${({ theme }) => theme.fonts.segoe};
//   font-weight: 600;
//   font-size: 12px;
//   line-height: 1.3;
// `;
