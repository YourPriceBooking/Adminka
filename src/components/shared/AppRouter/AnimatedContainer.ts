import styled, { keyframes } from 'styled-components/macro';

const fadeIn = keyframes`
  from {
    opacity: 0.01;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 0.99;
    transform: translate3d(0, 0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.99;
    transform: translate3d(0, 0);
  }
  to {
    opacity: 0.01;
     transform: translate3d(-20px, 0, 0);
  }
`;

export const AnimatedContainer = styled.div`
  &.fadeIn {
    animation: 210ms ${fadeIn} forwards;
  }

  &.fadeOut {
    animation: 210ms ${fadeOut} forwards;
  }
`;
