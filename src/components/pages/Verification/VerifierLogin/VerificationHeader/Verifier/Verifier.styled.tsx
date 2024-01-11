import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  background-color: #ffffff;
  max-width: 207px;
  /* padding-top: 18px;
  padding-left: 29px; */
  padding-right: 37px;
  margin-bottom: 14px;
  margin-left: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.p`
  /* margin-bottom: 46px; */
  padding-top: 18px;
  padding-left: 29px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  border: none;
  color: #4c4c4c;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 21px;
  margin-bottom: 15px;
`;
export const Btn = styled.button`
  width: 149px;
  height: 25px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  border: none;
  color: #0090ff;
  background: #ffffff;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }

  &:hover {
    background: #efeeee;
  }
  :focus {
    border: 0.33px solid ${({ theme }) => theme.colors.textThird};
    outline: none;
  }
  &:active {
    background: #e4e0e0;
  }
`;

export const ModalContainer = styled.div`
  width: 50vw;
  height: 90vh;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #787878;
  border-radius: 10px;
  z-index: 90;
  text-align: center;

  & h1 {
    color: rgba(0, 144, 255, 1);
    font-size: 33px;
    line-height: 43.89px;
  }
`;

export const ModalContent = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  & table {
    width: 70%;
    text-align: left;

    & td:first-child {
      font-weight: bold;
      width: 25%;
    }

    & td {
      padding-bottom: 1rem;

      &.date {
        width: 50%;
        text-align: center;
      }
    }

    & td:last-child.active {
      color: rgba(0, 107, 190, 1);
    }
    & td:last-child {
      color: rgba(255, 96, 0, 1);
      width: 15%;
    }
  }
`;
