import styled from 'styled-components/macro';
import { slideInLeft, slideOutLeft } from 'App.styled';

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;

  gap: 12px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 20px;
    margin-bottom: 28px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 54px;
    margin-bottom: 28px;
  }
`;

export const AddCountriesStyled = styled.section`
  width: 280px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 402px;
  }

  &.page-fade-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }
  &.page-fade-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

export const CountryEditorWrapper = styled.div`
  position: relative;
`;

export const ShowEditorButton = styled.button`
  width: 100%;
  min-width: 250px;
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

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.title};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.title};
  }
`;
