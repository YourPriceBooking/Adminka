import styled from 'styled-components';
import { slideInLeft, slideOutLeft } from 'App.styled';

export const AddCountriesStyled = styled.section`
  &.page-fade-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }
  &.page-fade-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

export const CountryEditorWrapper = styled.div`
  position: relative;

  width: 402px;
`;

export const ShowEditorButton = styled.button`
  min-width: 402px;
  height: 59px;

  padding: 12px 18px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 27px;
  line-height: 1.33;
  color: ${({ theme }) => theme.colors.textThird};
  text-align: start;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 10px;
`;

export const Expandable = styled.div.attrs(({ showEditor }: { showEditor: boolean }) => ({
  showEditor,
}))`
  position: absolute;
  top: 100%;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 10px;

  opacity: 0.99;
  transition: ${({ theme }) => theme.transition.fast};
  transition-property: transform, visibility, opacity;

  &.isHidden {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-21px);
  }
`;
