import styled from 'styled-components';

export const Button = styled.button`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 15px;
  background-color: rgba(173, 196, 217, 1);
  color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  border: none;
  padding: 0.7rem;
  max-width: 150px;

  &:hover {
    background-color: rgba(168, 213, 255, 1);
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #d0d0d0;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const CardsStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  height: max-content;
  width: max-content;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  margin-right: 1rem;

  & .cardBlockHeader {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    & .left {
      display: flex;
      gap: 15px;

      div {
        cursor: pointer;
      }
    }

    span {
      font-weight: 520;
    }
    span:last-child {
      color: rgba(0, 107, 190, 1);
    }
    span.text {
      color: rgba(174, 175, 188, 1);
    }
  }

  & .buttonBlock {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  & .list {
    display: flex;
    flex-direction: column;
  }
`;
