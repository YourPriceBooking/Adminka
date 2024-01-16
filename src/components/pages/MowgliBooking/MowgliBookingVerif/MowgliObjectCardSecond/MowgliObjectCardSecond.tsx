

import {
  MainBlock,
  CardsStyle,
  CardsMain,
  Photo,
  CardsDetails,
  CardsDetailsHeader,
  HotelName,
} from './MowgliObjectCardSecond.styled';

export const MowgliObjectCardSecond = () => (
  <MainBlock>
    <CardsStyle>
      <CardsMain>
        <Photo>
          <img src="HotelPhoto.png" alt="Hotel" />
        </Photo>
        <CardsDetails>
          <CardsDetailsHeader>
            <HotelName>
              <img src="HotelIcon.png" alt="Hotel" />
              <h5>Маямский Би</h5>
            </HotelName>
            <span>Флорида</span>
          </CardsDetailsHeader>
          <p>Проспект Ватутина,д.15,</p>
          <p>кв.6</p>
        </CardsDetails>
      </CardsMain>
    </CardsStyle>
  </MainBlock>
);

