import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  padding: 21px 54px;
  margin-top: 34px;
  margin-right: auto;
  margin-left: auto;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 9px;
`;