import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  margin-left: 17px;
  margin-top: 0;
  padding-top: 9px;
  max-width: 180px;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;

  & .icon {
    width: 40px;
    height: 40px;
    margin: 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    -webkit-appearance: none;
    appearance: none;

    & .icon-svg {
      width: 100%;
      height: 100%;
      fill: rgb(0, 144, 255);
      transition: currentColor 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    & .icon-text {
      position: absolute;
      top: 64%;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 76%;
      font-weight: 700;
      font-size: 9px;
      line-height: 10px;
      font-family: 'Segoe UI';
      color: #fff;
      word-break: break-word;
      text-align: center;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
`;

export const HotelName = styled.div`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #656565;
`;

export const HotelNameXs = styled.div`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;

  color: #656565;
  font-size: 12px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 14px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #656565;
`;

export const CityName = styled.h2`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;
export const CityNameXs = styled.h2`
  font-weight: 700;
  font-size: 18px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Address = styled.p`
  margin-left: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #656565;
`;
