import styled from 'styled-components/macro';

export const AddEmailAccessMainDiv = styled.div`
  display: flex;
`;

export const AddEmailAccessStyled = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  padding: 20px 38px;
  & p {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #4c4c4c;
  }
`;
export const AddEmailAccessInput = styled.input`
  background: #ebedfe;
  border: 1.33987px solid #a5a5a5;
  border-radius: 5px;
  margin: 10px 0px;
  width: 204px;
  height: 32px;
  &:focus {
    outline: none;
    border: 1px solid #6dbffe;
  }
`;

export const AddEmailAccessButtonStyled = styled.button`
  width: 204px;
  height: 39px;
  background: #0090ff;
  border: none;
  border-radius: 3px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;