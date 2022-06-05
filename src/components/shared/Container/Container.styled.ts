import styled from 'styled-components';

export const ContainerStyled = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: 0 20px;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: ${({ theme }) => theme.breakpoints.tablet};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: ${({ theme }) => theme.breakpoints.desktop};
  }
`;
