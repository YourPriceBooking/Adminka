import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
export const NavBarStyled = styled.nav``;

export const NavListStyled = styled.ul`
  display: flex;
  gap: 30px;
  padding: 0;
`;

export const NavLinkStyled = styled(NavLink)`
  position: relative;
  color: #212121;

  &.active {
    color: ${({ theme }) => theme.colors.active};
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(100% + 2px);
    left: 0;

    width: 100%;
    height: 2px;

    background-color: ${({ theme }) => theme.colors.active};
    border-radius: 2px;

    transition: transform ${({ theme }) => theme.transition.short};
    transform: scaleX(0);
  }

  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`;
