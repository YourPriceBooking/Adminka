import styled from 'styled-components/macro';

export const AddStateFormStyled = styled.form`
  padding: 12px 16px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const AddLocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 46px;
  height: 46px;

  font-weight: 700;
  font-size: 15px;
  line-height: 1.33;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: ${({ theme }) => theme.colors.bg.buttonAddLocation};
  border: none;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows.buttonAddLocation};
`;
