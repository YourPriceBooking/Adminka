import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';
import { slideInLeft, slideOutLeft } from 'App/App.styled';

export const HomeStyled = styled.section`
  padding: 74px 0;

  &.page-fade-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }
  &.page-fade-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

export const HomeNavListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 72px;

  > li {
    > a {
      gap: 20px;
    }

    padding: 120px 28px 0;
  }

  > li:nth-of-type(1) {
    > a {
      gap: 40px;
    }
  }

  > li:nth-of-type(2) {
    > a {
      gap: 40px;
    }
  }

  > li:nth-of-type(3) {
    padding: 50px 28px 0;
  }

  > li:nth-of-type(4) {
    padding: 80px 28px 0;
  }

  > li:nth-of-type(5) {
    padding: 108px 28px 0;
  }
`;

export const HomeNavItem = styled.li`
  display: flex;
  flex-direction: column;

  width: 290px;
  height: 290px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 9px;
  box-shadow: 0px 0px 9px 2px ${({ theme }) => theme.shadows.quarterBlack};
`;

export const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 27px;
  font-weight: 500;
  line-height: 1.18; // 32px
  color: ${({ theme }) => theme.colors.black};
  text-align: center;

  transition: color ${({ theme }) => theme.transition[110]};

  :hover,
  :focus {
    color: ${({ theme }) => theme.colors.textSecond};
  }
`;

export const TextAccent = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 50px;
  font-weight: 300;
  line-height: 1.18; // 59px
  color: ${({ theme }) => theme.colors.textSecond};
  text-decoration: none;
  letter-spacing: 0.255em;
`;

export const TextSmall = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 300;
  font-size: 15px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.black}; ;
`;

export const TextNormal = styled(TextSmall)`
  font-size: 18px;
  line-height: 1.16;
`;

export const StatsListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatsListItem = styled.li``;

export const TextMedium = styled(TextSmall)`
  display: flex;
  justify-content: space-between;

  font-size: 21px;
  line-height: 1.19;
  text-align: center;
`;

export const TextMediumAccent = styled(TextMedium)`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecond};
  min-width: 40px;
  justify-content: center;
`;
