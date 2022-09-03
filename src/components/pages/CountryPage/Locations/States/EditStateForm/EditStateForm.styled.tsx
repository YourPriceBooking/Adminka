import styled from 'styled-components/macro';

export const StateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 10px 20px;

  word-break: break-all;
`;

export const EditStateFormStyled = styled.form`
  position: relative;
  display: flex;
  align-items: flex-start;

  /* @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  } */
`;
