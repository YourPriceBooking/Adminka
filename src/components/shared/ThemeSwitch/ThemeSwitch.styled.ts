import styled from 'styled-components';

export const ThemeSwitchStyled = styled.div`
  display: flex;
  gap: 8px;

  padding: 0 12px;
`;

export const ThemeSwitchButtonLight = styled.button`
  padding: 2px 8px;
  font-size: clamp(16px, 2vw, 24px);

  border-radius: 20px;
  background-color: #ededed;
`;

export const ThemeSwitchButtonDark = styled(ThemeSwitchButtonLight)`
  background-color: #292929;
`;
