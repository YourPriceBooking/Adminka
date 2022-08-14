import styled from 'styled-components/macro';

export const CountryList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  max-height: 300px;
  padding: 16px 12px;
  overflow-y: auto;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 34px 40px;
  }
`;

export const EditCountryItem = styled.li`
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;
