import styled from 'styled-components/macro';

export const HeadingsListStyled = styled.ul`
  min-height: 71px;

  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-template-columns: 34.3% 33.3% 32.4%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.list};
`;

export const HeadingsItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.colors.border.list};
  }
`;

export const HeadingsText = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.textThird};
`;
