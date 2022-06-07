import styled from 'styled-components';

export const AddCountriesStyled = styled.section``;

export const ShowEditorButton = styled.button`
  min-width: 402px;
  min-height: 59px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 27px;
  line-height: 1.33;
  color: ${({ theme }) => theme.colors};
  text-align: center;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.linkBorder};
  border-radius: 10px;
`;
