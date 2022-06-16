import styled from 'styled-components/macro';

export const EditCountryFormStyled = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  }
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
