import styled from 'styled-components/macro';

export const EditStateListStyled = styled.ul``;

export const EditLocationsItemStyled = styled.li`
  display: flex;
  align-items: center;

  padding: 9px 0 18px 30px;
  border-bottom: 5px solid ${({ theme }) => theme.colors.border.list};
`;

export const EditLocationButton = styled.button`
  background-color: blue;
  padding: 10px 20px;
`;

export const StateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 10px 20px;
`;

export const EditStateFormStyled = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

export const SubmitAddLocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 108px;
  height: 46px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.33;
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: ${({ theme }) => theme.colors.bg.buttonSubmitAddLocation};
  box-shadow: ${({ theme }) => theme.shadows.buttonAddLocation};
  border-radius: 1.66667px;

  border: none;
`;
