import styled from 'styled-components/macro';

export const UrlDirButtonStyled = styled.button.attrs(
  ({ $isEnabled = false, variable = 'green' }: { $isEnabled?: boolean,  variable?: 'green' | 'purple'}) => ({
    $isEnabled, variable
  })
)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 30px;

  font-weight: 700;
  font-size: 11px;
  line-height: 15px;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ variable,  $isEnabled }) => variable === 'green' ? $isEnabled ? '#fff' : '#fff' : $isEnabled ? '#fff' : '#008AFF'};

  text-align: center;

  background-color: ${({ variable, $isEnabled }) => variable === 'green' ? $isEnabled ? '#6AFF79' : '#9FC9A3' : $isEnabled ? '#AFB4F1' : '#fff'};
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`