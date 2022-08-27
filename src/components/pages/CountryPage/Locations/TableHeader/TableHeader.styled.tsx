import styled from 'styled-components/macro';

export const HeadingsListStyled = styled.ul`
  display: grid;
  grid-template-columns: 34.3% 33.3% 32.4%;

  min-height: 71px;

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
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.textThird};
`;
