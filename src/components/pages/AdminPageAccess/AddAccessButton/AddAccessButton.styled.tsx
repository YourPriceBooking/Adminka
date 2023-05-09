import styled from 'styled-components/macro';

export const AddAccessButtonStyled = styled.button`
  background: #6aff79;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  border: none;
  width: 86px;
  height: 86px;

  span {
    width: 16px;
    height: 16px;
    color: white;
    font-weight: 800;
    font-size: 24px;
  }
  p {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    font-size: 15.4412px;
    line-height: 21px;
    text-align: center;
    color: white;
  }
  :hover {
    background: #63ab6a;
  }
  :active {
    background: #a2f3aa;
  }
`;