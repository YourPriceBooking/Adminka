import styled from 'styled-components/macro';
import { rgba } from 'polished';
import { ReactComponent as iconClose } from 'assets/icons/iconClose.svg';
import checkmark from 'assets/icons/checkmark.png';

export const SelectButton = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 48px 8px 16px;

  font-size: 27px;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: none;
  border: 1px solid ${rgba('#2195f3', 0.21)};
  border-radius: 8px;
  transition: background-color ${({ theme }) => theme.transition[110]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.hover.buttonSelectLanguage};
  }

  &::after {
    position: absolute;
    right: 10px;

    width: 20px;
    height: 20px;
    content: '';

    background-image: url(${checkmark});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: space-between;

  padding: 8px;

  font-size: 27px;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: none;
  border: 1px solid ${rgba('#2195f3', 0.21)};
  border-radius: 50%;
  transition: background-color ${({ theme }) => theme.transition[110]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.hover.buttonSelectLanguage};
  }
`;

export const DeleteIcon = styled(iconClose)`
  width: 12px;
  height: 12px;
  fill: currentColor;
`;
