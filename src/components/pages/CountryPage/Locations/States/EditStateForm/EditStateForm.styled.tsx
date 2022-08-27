import styled from 'styled-components/macro';

export const StateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 10px 20px;

  word-break: break-all;
`;

export const EditStateFormStyled = styled.form`
  position: relative;
  display: flex;
  align-items: flex-start;

  /* @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  } */
`;

export const SubmitAddLocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 108px;
  height: 46px;

  font-weight: 700;
  font-size: 15px;
  line-height: 1.33;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: ${({ theme }) => theme.colors.bg.buttonSubmitAddLocation};
  border: none;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows.buttonAddLocation};
`;

export const ButtonsOverlay = styled.div`
  position: absolute;
  top: 4px;
  right: 8px;
  display: flex;
  gap: 4px;
`;
