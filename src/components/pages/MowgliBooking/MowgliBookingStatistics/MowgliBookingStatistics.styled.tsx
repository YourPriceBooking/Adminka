import styled from 'styled-components';

export const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(170.93deg, #b1e2a6 6.88%, rgba(81, 142, 68, 0) 94.72%);
  display: flex;
  justify-content: center;
`;

export const MowgliBookingMainStatistics = styled.div`
  width: 80.25%;
`;

export const Inner = styled.div`
  padding: 21px 54px 69px;
  margin-top: 37px;
  margin-right: auto;
  margin-left: auto;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 9px;
`;