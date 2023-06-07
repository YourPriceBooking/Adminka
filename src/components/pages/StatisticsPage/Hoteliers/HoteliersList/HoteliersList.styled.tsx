import styled from 'styled-components/macro';



export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const Inner = styled.div`
  display: flex;

  width: 100%;
  padding: 7px 11px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 0.4px solid ${({ theme }) => theme.colors.border.borderList};

  &:hover {
    border: 0.4px solid ${({ theme }) => theme.colors.border.btnBorderHover};
  }
`;

export const TextID = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px/12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textThird};
`;

export const WrapperText = styled.p`
  display: flex;
  gap: 13px;

  margin-left: 26px;
`;

export const TextContent = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px/12px;
  color: ${({ theme }) => theme.colors.textThird};
`;
