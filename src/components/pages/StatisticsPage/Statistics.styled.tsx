import styled from 'styled-components/macro';

export const Inner = styled.div`
  padding: 21px 54px 69px;
  margin-top: 37px;
  margin-right: auto;
  margin-left: auto;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 9px;
`;

export const Wrapper = styled.div`
  width: 80.25%;
  padding-left: 15%;
  padding-bottom: 80px;
  padding-top: 20px;
`;