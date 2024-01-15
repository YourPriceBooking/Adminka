import styled from 'styled-components';

export const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`

export const CardsStyle = styled.div`
  min-width: 300px;
  height: max-content;
  width: max-content;
  background: #fff;
  border-radius: 2px;
  padding: 1rem;
  margin-right: 1rem;
`;
export const CardsMain = styled.div`
display: flex;
`;

export const Photo = styled.div`
  width: 115.32px;
height: 115.32px;
top: 460px;
left: 460px;
`;
export const CardsDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  p {
    font-family: ${({ theme }) => theme.fonts.segoe};
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #656565;
    margin-left: 12px;
  }
`;
export const HotelName = styled.div`
  display: flex;
  align-items: center;
  margin-top: -20px;
  h5 {
    font-family: ${({ theme }) => theme.fonts.segoe};
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

  img {
    width: 58px;
    height: 58px;
  }
`;

export const CardsDetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: ${({ theme }) => theme.fonts.segoe};
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #656565;
    margin-left: 12px;
    margin-bottom: 15px;
    margin-top: -15px;
  }
`;
