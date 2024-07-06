import styled from 'styled-components';

export const NavigationListStyled = styled.ul`
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  padding-top: 20px;
  max-height: 100vh;

  background-color: #fff;
  border: 1px solid #787878;
  border-radius: 9px;
  box-shadow: #0000003f 0px 0px 9px 2px;
  li {
    width: fit-content;
  }
  a,
  a:visited {
    color: inherit;
  }

  a:hover,
  a:focus {
    color: blue;
  }
`;
