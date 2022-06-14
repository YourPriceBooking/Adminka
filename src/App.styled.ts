import styled, { keyframes } from 'styled-components/macro';

export const AppStyled = styled.div``;

export const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

export const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;

export const AppLoading = styled.div`
  position: fixed;
  z-index: 10000;

  width: 100vw;
  height: 100vh;

  background-color: #c1d5e4;

  /* animation: 500ms rotate infinite; */

  /* @keyframes rotate {
    from {
      transform: rotate3d(0, 0, 0, 0deg);
    }
    to {
      transform: rotate3d(0, 0, 0, 360deg);
    }
  } */
`;
