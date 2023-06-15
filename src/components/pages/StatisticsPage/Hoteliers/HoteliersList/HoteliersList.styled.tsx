import styled from 'styled-components/macro';

type PropsBorder = {
  border: boolean;
};

type Props = {
  tabIndex: number;
};

export const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;

  cursor:pointer;
`;

export const Inner = styled.li.attrs<Props>(({ tabIndex }) => ({
  'data-id': tabIndex,
}))<PropsBorder>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 4px 31px 4px 11px;

  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ border }) => (border ? '0.7px' : '0.3px')} solid
    ${({ border, theme }) => (border ? theme.colors.black : theme.colors.border.borderList)};

  &:hover {
    border: 0.4px solid ${({ theme }) => theme.colors.border.btnBorderHover};
  }
`;

export const TextID = styled.p.attrs<Props>(({ tabIndex }) => ({
  'data-id': tabIndex,
}))`
  white-space: nowrap;
  
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px/12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textThird};
`;

export const WrapperText = styled.div.attrs<Props>(({ tabIndex }) => ({
  'data-id': tabIndex,
}))`
  display: flex;
  gap: 13px;

  width: 77%;
  white-space: nowrap;
  overflow: hidden;

  margin-left: 26px;
`;

export const TextContent = styled.p.attrs<Props>(({ tabIndex }) => ({
  'data-id': tabIndex,
}))`
display: inline-block
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px/12px;
  color: ${({ theme }) => theme.colors.textThird};
`;
