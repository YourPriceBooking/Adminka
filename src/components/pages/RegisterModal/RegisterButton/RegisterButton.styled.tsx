import styled from 'styled-components/macro';

export const Wrapper = styled.li`
  position: relative;
`;

export const ListBtn = styled.ul`
  display: flex;
  justify-content: center;
  gap: 140px;
`;

// export const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.white};
//   border: 1px solid ${({ theme }) => theme.colors.border.btnBorder};
//   border-radius: 5px;
//   width: 203px;

//   cursor: pointer;
//   padding: 7px 0;
//   transition: ${({ theme }) => theme.transition[250]};

//   color: ${({ theme }) => theme.colors.textPrimary};
//   font-family: ${({ theme }) => theme.fonts.segoe};
//   font-weight: 600;
//   font-size: 12px;
//   line-height: 1.3;

//   &:hover {
//     border: 0.5px solid ${({ theme }) => theme.colors.border.btnBorderHover};
//   }
// `;

type ButtonProps = {
  dataIndex: number;
};

export const Button =
  styled.button.attrs <
  ButtonProps>(props => ({
    'data-index': props.tabIndex,
  }))`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.btnBorder};
  border-radius: 5px;
  width: 203px;

  cursor: pointer;
  padding: 7px 0;
  transition: ${({ theme }) => theme.transition[250]};

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;

  &:hover {
    border: 0.5px solid ${({ theme }) => theme.colors.border.btnBorderHover};
  }
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: -17px;

  width: 242px;
  height: 279px;
  background-color: white;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  z-index: 10;

  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const Text = styled.a`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 17px;
  cursor: pointer;
  padding: 12px 23px 12px 23px;

  &: nth-of-type(1) {
    padding: 24px 23px 12px 23px;
  }

  &:hover {
    background-color: #e5e5e5;
  }
`;