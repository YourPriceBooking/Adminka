import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const HomeStyled = styled.section`
  min-height: 100vh;
  padding: 74px 0;
  background-color: #c1d5e4;
`;

export const HomeNavListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 72px;
`;

export const HomeNavItem = styled.li`
  display: flex;
  flex-direction: column;

  width: 290px;
  height: 290px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.linkBorder};
  border-radius: 9px;
  box-shadow: 0px 0px 9px 2px ${({ theme }) => theme.shadows.quarterBlack};
`;

export const Link = styled(RouterLink)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 30px;
  flex-grow: 1;
  padding: 120px 28px 0;

  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 27px;
  font-weight: 500;
  line-height: 1.18; // 32px
  color: ${({ theme }) => theme.colors.black};
  text-align: center;

  transition: color ${({ theme }) => theme.transition.short};

  :hover,
  :focus {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const TextAccent = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 50px;
  font-weight: 300;
  line-height: 1.18; // 59px
  color: ${({ theme }) => theme.colors.accent};
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

export const StatsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  color: ${({ theme }) => theme.colors.accent};
  min-width: 40px;
  justify-content: center;
`;
