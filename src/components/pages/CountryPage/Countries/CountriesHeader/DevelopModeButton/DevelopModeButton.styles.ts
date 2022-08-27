import styled from 'styled-components/macro';

export const DevButtonStyled = styled.button`
  position: absolute;
  top: 0;
  left: 100%;

  width: fit-content;
  padding: 4px 12px;

  opacity: 0.1;

  :hover,
  :active {
    opacity: 0.8;
  }
`;
