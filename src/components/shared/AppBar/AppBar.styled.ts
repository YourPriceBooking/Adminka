import styled from 'styled-components';

export const AppBarStyled = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px 30px;

  min-height: 20vh;
  font-size: calc(10px + 2vmin);
  color: white;
  background-color: ${({ theme }) => theme.colors.bg}; ;
`;

export const NavBar = styled.nav``;

export const NavList = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  padding: 0;
`;
