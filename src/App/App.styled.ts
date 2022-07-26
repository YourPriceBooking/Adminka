import { rgba } from 'polished';
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

const tomato = rgba('#cafe', 0.8);

export const DevIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 32px;

  background-color: ${tomato};

  transform: rotate(45deg);

  &::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: -32px;

    width: 0;
    height: 0;
    border-left: 32px solid transparent;
    border-bottom: 32px solid ${tomato};
  }

  &::after {
    content: '';

    position: absolute;
    bottom: 0;
    right: -32px;

    width: 0;
    height: 0;
    border-right: 32px solid transparent;
    border-bottom: 32px solid ${tomato};
  }
`;
