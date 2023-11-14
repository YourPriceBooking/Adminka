import apartHotelIcon from 'assets/icons/apartHotelIcon.svg';
import {
  Wrapper,
  Header,
  Address,
  CityWrapper,
  CityName,
  CityNameXs,
  HotelName,
  HotelNameXs,
} from './Location.styled';

type City = {
  city: string;
  hotel: string;
  address: string;
  type: string;
};

export const Location = ({ city, hotel, address, type }: City) => (
  <Wrapper>
    <Header>
      <div className="icon">
        <svg className="icon-svg">
          <use href={`${apartHotelIcon}#home`} />
        </svg>
        <div className="icon-text">{type}</div>
      </div>
      {hotel.length < 10 ? <HotelName>{hotel}</HotelName> : <HotelNameXs>{hotel}</HotelNameXs>}
    </Header>
    <CityWrapper>
      {city.length < 10 ? <CityName>{city}</CityName> : <CityNameXs>{city}</CityNameXs>}
    </CityWrapper>
    <Address>{address}</Address>
  </Wrapper>
);
