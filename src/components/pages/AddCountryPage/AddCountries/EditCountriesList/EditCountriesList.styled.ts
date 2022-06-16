import styled from 'styled-components/macro';

export const CountryListWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const CountryList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  gap: 12px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 34px 40px;
  }
`;

export const EditCountryItem = styled.li`
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const CountryInputLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const EditCountryInput = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 4px 8px;
`;

export const EditCountryForm = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  }
`;
