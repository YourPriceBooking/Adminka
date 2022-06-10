import styled from 'styled-components/macro';

export const CountryListWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const CountryList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 40px;
  gap: 12px;
`;

export const CountryInputLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const EditCountryInput = styled.input`
  font-size: 20px;
  padding: 4px 8px;
`;

export const EditCountryForm = styled.form`
  display: flex;
  gap: 20px;
`;
