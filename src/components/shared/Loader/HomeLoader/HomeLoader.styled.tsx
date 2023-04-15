import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';


export const WrapperLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const pulsate = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
`;

export const Svg = styled.img`
  position: absolute;
  top: 42px;
  left: 45px;
  animation: ${pulsate} 1.2s ease-in-out infinite;
`;

