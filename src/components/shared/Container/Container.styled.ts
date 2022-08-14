import styled from 'styled-components/macro';

export const ContainerStyled = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: 0 20px;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: ${({ theme }) => theme.breakpoints.tablet};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    padding: 0 60px;
  }
`;

type ScrollProps = {
  isModalOpen: boolean;
  scrollWidth: number;
};

export const ScrollContainerStyled = styled.div.attrs(
  ({ isModalOpen, scrollWidth }: ScrollProps) => ({
    isModalOpen,
    scrollWidth,
  })
)`
  overflow-y: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'scroll')};
  margin-right: ${({ isModalOpen, scrollWidth }) => isModalOpen && `${scrollWidth}px`};
  min-height: 100vh;
`;
