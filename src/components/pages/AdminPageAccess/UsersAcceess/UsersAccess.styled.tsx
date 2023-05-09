import styled from 'styled-components/macro';

export const UsersAccessStyledPlace = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 18px 61px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 36px 91px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin: 100px 133px;
  }
`;

export const UsersAccessStyledMain = styled.div`
  background: #ffffff;
  border: 1px solid #787878;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  width: 963px;
  padding: 15px 0px;
`;

export const UsersAccessHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #4c4c4c;
  margin-left: 5%;
  p {
    margin-top: 20px;
  }
`;
export const CheckboxName = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0px 42px;
  }
  p:nth-of-type(1) {
    margin-right: 0px;
  }
  p:nth-of-type(2) {
    margin-right: 0px;
  }
  p:nth-of-type(4) {
    margin-right: 48px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }
`;
  export const Line = styled.div`
    border-bottom: 1px solid #a5a5a5;
    margin-top: 10px;
  `;

export const AddAccessButtonOption = styled.div`
    margin-left:5%;
    margin-top: 22px;
`