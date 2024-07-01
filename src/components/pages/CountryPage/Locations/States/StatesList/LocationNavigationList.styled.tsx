import styled from 'styled-components';

export const NavigationListStyled = styled.ul`
  position: fixed;
  top: 10px;
  left: 10px;

  padding: 5px;

  background-color: #fff;
  border: 1px solid #787878;
  border-radius: 9px;
  box-shadow: #0000003f 0px 0px 9px 2px;

  a,
  a:visited {
    color: inherit;
  }

  a:hover,
  a:focus {
    color: blue;
  }
`;
