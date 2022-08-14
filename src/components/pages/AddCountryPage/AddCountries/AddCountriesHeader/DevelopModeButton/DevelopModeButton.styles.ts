import styled from 'styled-components/macro';

export const DevButtonStyled = styled.button`
  position: absolute;
  top: 0;
  left: 100%;
  padding: 4px 12px;
  width: fit-content;

  opacity: 0.1;

  :hover,
  :active {
    opacity: 0.8;
  }
`;
