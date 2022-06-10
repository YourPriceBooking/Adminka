import styled from 'styled-components/macro';

export const AddCountryFormStyled = styled.form`
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
