import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  width: 134px;
  height: 254px;

  padding: 7px 5px;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 5.92593px;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  height: 100%;
  overflow-y: scroll;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 5.92593px;

  /* scrollbar */

  scrollbar-color: ${({ theme }) => theme.colors.title} ${({ theme }) => theme.colors.white};
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-moz-scrollbar {
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 30px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    background-color: ${({ theme }) => theme.colors.title};
  }
`;


export const MessageAuthorTime = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 400;
  font-size: 9px;
  line-height: 12px/9px;

  margin-bottom: 4px;
`;

export const MessageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 11.1111px;
  line-height: 15px/11.1111px;
`;

