import styled, { css } from 'styled-components/macro';
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

export const Expandable = styled.div`
  position: absolute;
  top: 100%;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 10px;

  opacity: 0.99;
  transition: ${({ theme }) => theme.transition[160]};
  transition-property: transform, visibility, opacity;

  ${({ isHidden }: { isHidden: boolean }) =>
    isHidden &&
    css`
      visibility: hidden;
      opacity: 0.01;
      transform: translateY(-21px);
    `}
`;

export const CountryListWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const CountryList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 40px;
  gap: 12px;
`;

export const CountryInputLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const EditCountryForm = styled.form`
  display: flex;
  gap: 20px;
`;

export const AddCountryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 55px 28px;
`;

export const AddCountryText = styled.p`
  width: 274px;

  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: justify;

  color: #4c4c4c;
`;

export const AddCountryInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  width: 292px;
  height: 42px;

  background-color: #ffffff;
  border: 1px solid #787878;
  border-radius: 10px;
`;

export const AddCountryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  width: 154px;
  height: 42.29px;

  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  color: #ffffff;

  background-color: rgba(0, 144, 255, 0.7);
  border: 1px solid transparent;
  border-radius: 3px;

  :disabled {
    background-color: rgba(0, 144, 255, 0.5);
  }

  :hover {
    background-color: rgba(0, 144, 255, 0.9);
    border-color: white;
  }

  :active {
    background-color: rgba(0, 144, 255, 0.3);
  }
`;
