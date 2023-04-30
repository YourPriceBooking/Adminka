import styled from 'styled-components/macro';

export const Wrapper = styled.li`
  position: relative;
`;

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

export const ModalWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 10;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Text = styled.p`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 17px;
`;