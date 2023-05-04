import styled from 'styled-components/macro';

export const ModalWrapper = styled.div`
  position: absolute;
  left: -17px;

  display: flex;
  flex-direction: column;
  overflow: scroll;

  width: 242px;
  height: 279px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.buttonModal};
  z-index: 10;
`;

export const Text = styled.p`
  padding: 12px 23px 12px 23px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 700;
  font-size: 13px;
  line-height: 17px/13px;

  color: ${({ theme }) => theme.colors.textButton};

  cursor: pointer;

  &: nth-of-type(1) {
    padding: 24px 23px 12px 23px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.hover.buttonSelectLanguage};
  }
`;
