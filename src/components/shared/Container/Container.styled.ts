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
};

export const ScrollContainerStyled = styled.div.attrs(({ isModalOpen }: ScrollProps) => ({
  isModalOpen,
}))`
  overflow-y: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'scroll')};
  padding-right: ${({ isModalOpen }) => isModalOpen && '17px'};
  height: 100vh;
`;
