import styled from 'styled-components/macro';

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  margin: 0 auto;
  margin-bottom: 24px;
  justify-content: center;

  color: #4c4c4c;
`;

export const Wrapper = styled.div`
  width: 162px;
  height: 158px;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 15px;
  text-align: center;
  align-items: center;
  background: #ffffff;
  /* background-color: #ebedfe; */
  border-radius: 10px;
  padding: 20px 10px;
`;
export const Country = styled.h2`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
`;
export const Text = styled.p`
  margin-bottom: 20px;
  color: #aeafbc;
`;

export const Object = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: inherit;
  justify-content: space-evenly;
  cursor: pointer;
  color: #626367;

  &.disabled {
    pointer-events: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;
export const Span = styled.span`
  display: block;
  width: max-content;
`;
export const Button = styled.button`
  font-family: ${({ theme }) => theme.fonts.segoe};
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 15px;
  background-color: #aeafbc;
  color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  border: none;
  padding: 3px;
  max-width: 150px;

  &:hover {
    background-color: #9c9daf;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #d0d0d0;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  // background-color: #ebedfe;
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
