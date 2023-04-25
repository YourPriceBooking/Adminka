import styled from 'styled-components/macro';

export const EmailInputStyled = styled.div`
  padding-top: 46px;
`;

export const ErrorEmail = styled.span`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #fe6d6d;
`;

export const Input = styled.input<{ error: boolean }>`
  height: 48px;
  width: 410px;
  font-size: 20px;
  line-height: 27px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.textFourth};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bg.buttonAddLocation};
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  :active {
    border: 1px solid ${({ theme }) => theme.colors.active};
  }
  ${({ error }) =>
    error &&
    `
    border: 2px solid red;
  `}
`;
