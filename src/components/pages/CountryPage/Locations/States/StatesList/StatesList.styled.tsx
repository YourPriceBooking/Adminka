import styled from 'styled-components/macro';

export const StatesListStyled = styled.ul``;

export const StateItemStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;

  padding: 4px 0 8px 12px;

  border-bottom: 5px solid ${({ theme }) => theme.colors.border.list};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    padding: 8px 0 12px 18px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 34.3% 33.3% 32.4%;
    padding: 9px 0 18px 18px;
  }
`;

export const CitiesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
