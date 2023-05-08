import styled from 'styled-components/macro';

export const ChatTextarea = styled.textarea`
  width: 134px;
  height: 72px;

  padding: 7px 28px 7px 7px;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 5.92593px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 11.1111px;
  line-height: 15px/11.1111px;
  resize: none;

  &:focus {
    outline: none;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.textPrimary};
  }

  /* scrollbar */

  scrollbar-color: ${({ theme }) => theme.colors.scrollColor} ${({ theme }) => theme.colors.white};
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 30px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    background-color: ${({ theme }) => theme.colors.scrollColor};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.scrollColorHover};
    }
`;

export const Button = styled.button`
  position: absolute;
  bottom: 7.67px;
  right: 8.19px;
  background-color: transparent;
  border: none;
  padding:0;
`;

export const Img = styled.img`


width: 14.81px;
height: 13.33px;
`;




