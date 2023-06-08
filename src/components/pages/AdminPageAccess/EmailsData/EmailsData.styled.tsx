import styled from 'styled-components/macro';

export const EmailsDataPageStyled = styled.div`
  display: flex;
  margin-top: 78px;
  justify-content: center;
  overflow-y:auto;
  
`;
export const EmailsMainStyled = styled.div`

  background: #ffffff;
  border: 1px solid #787878;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  margin-right: 30px;
`;
export const EmailMainHeaderStyled = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
  p {
    padding: 22px 30px;
  }
  .check-name {
    display: flex;
    p {
      padding: 22px 30px;
    }
  }
`;
export const EmailMainBodyStyled = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
`;
export const ActiveBlock = styled.div`
  display: block;
`;
