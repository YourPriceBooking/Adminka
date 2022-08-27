import styled from 'styled-components/macro';

export const EditLanguageFormStyled = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  }
`;

export const LanguageInputLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const EditLanguageInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  font-size: 20px;
`;
