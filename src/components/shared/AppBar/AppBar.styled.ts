import styled from 'styled-components/macro';

export const AppBarStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
  padding: 0 30px;

  min-height: 50px;
  font-size: calc(10px + 2vmin);
  color: white;
  background-color: ${({ theme }) => theme.colors.bg}; ;
`;

export const AppLogo = styled.img`
  height: 50px;
  width: 50px;

  @media (prefers-reduced-motion: no-preference) {
    animation: spin infinite 20s linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
