import styled from 'styled-components/macro';

export const AddCountriesHeaderStyled = styled.header`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  padding-top: 16px;
  margin-bottom: 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 20px;
    padding-top: 32px;
    margin-bottom: 28px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 54px;
    margin-bottom: 28px;
  }
`;

export const DevButton = styled.button`
  position: absolute;
  top: 0;
  left: 100%;
  padding: 4px 12px;
  width: fit-content;

  opacity: 0.1;

  :hover,
  :active {
    opacity: 0.8;
  }
`;
