import styled from 'styled-components/macro';

  export const UsersAccessBodyStyled = styled.div`
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 2%;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      color: #4c4c4c;
      margin-top: 39px;
    }
  `;
  export const EmailOption = styled.div`
    display: flex;
    flex-direction: column;
    p {
      font-family: 'Segoe UI';
      font-style: normal;
      font-weight: 600;
      font-size: 12.2093px;
      line-height: 16px;
      margin: 8px 0px;
      color: #6aff79;
    }
    button {
      background: #ffffff;
      box-shadow: 0px 0px 4.06977px rgba(0, 0, 0, 0.25);
      border: none;
      border-radius: 4.06977px;
      font-family: 'Segoe UI';
      font-style: normal;
      font-weight: 600;
      font-size: 12.2093px;
      line-height: 16px;
      text-align: center;
      color: #0090ff;
      margin-bottom: 10px;
    }
  `;
  export const CheckboxOption = styled.div`
    label {
      display: none;
    }
    input {
      margin-left: 8px;
    }
    display: flex;
    align-items: center;
  `;
    export const Line = styled.div`
      border-bottom: 1px solid #a5a5a5;
      margin-top: 10px;
    `;