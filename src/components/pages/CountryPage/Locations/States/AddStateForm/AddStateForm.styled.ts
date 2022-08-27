import styled from 'styled-components/macro';

export const AddStateFormStyled = styled.form`
  padding: 12px 16px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
`;

export const AddLocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 46px;
  height: 46px;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.33;
  color: ${({ theme }) => theme.colors.textThird};
  text-align: center;

  background: ${({ theme }) => theme.colors.bg.buttonAddLocation};
  box-shadow: ${({ theme }) => theme.shadows.buttonAddLocation};
  border-radius: 2px;

  border: none;
`;
