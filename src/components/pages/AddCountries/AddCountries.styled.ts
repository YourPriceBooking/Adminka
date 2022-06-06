import styled from 'styled-components';

export const AddCountriesStyled = styled.section``;

export const ShowEditorButton = styled.button`
  min-width: 402px;
  min-height: 59px;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.linkBorder};
  border-radius: 10px;
`;
