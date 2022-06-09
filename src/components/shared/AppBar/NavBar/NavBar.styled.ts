import styled, { css } from 'styled-components/macro';
export const NavBarStyled = styled.nav``;

export const NavListStyled = styled.ul`
  display: flex;
  gap: 30px;
  padding: 0;
`;

// export const NavLinkStyled = styled(NavLink)`
//   position: relative;
//   color: ${({ theme }) => theme.colors.main};

//   &.active {
//     color: ${({ theme }) => theme.colors.active};
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     top: calc(100% + 2px);
//     left: 0;

//     width: 100%;
//     height: 2px;

//     background-color: ${({ theme }) => theme.colors.active};
//     border-radius: 2px;

//     transition: transform ${({ theme }) => theme.transition[110]};
//     transform: scaleX(0);
//   }

//   &.active::after,
//   &:hover::after {
//     transform: scaleX(1);
//   }
// `;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 70px;
  height: 49px;
  padding: 10px;

  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;

  :hover {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonGoBackHover};
  }

  :active {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonCancelDeleteHover};
    border-color: transparent;
  }
`;
