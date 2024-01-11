
import { MowgliBookingVerifHeader } from './MowgliBookingVerifHeader';
import { MowgliObjectCard } from './MowgliObjectCard';
import { MowgliObjectCardSecond } from './MowgliObjectCardSecond';
import { MowgliBookingMainPage, CardsWrapper } from './MowgliBookingVerif.styled';


export const MowgliBookingVerif = () => (
  <MowgliBookingMainPage>
    <MowgliBookingVerifHeader />
    <CardsWrapper>
      <MowgliObjectCard />
      <MowgliObjectCard />
      <MowgliObjectCard />
    </CardsWrapper>
    <CardsWrapper>
      <MowgliObjectCardSecond />
      <MowgliObjectCardSecond />
      <MowgliObjectCardSecond />
    </CardsWrapper>
  </MowgliBookingMainPage>
);



