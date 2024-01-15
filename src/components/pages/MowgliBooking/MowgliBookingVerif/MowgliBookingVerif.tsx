
import { MowgliBookingVerifHeader } from './MowgliBookingVerifHeader';
import { MowgliObjectCard } from './MowgliObjectCard';
import { MowgliObjectCardSecond } from './MowgliObjectCardSecond';
import { MowgliBookingMainPage, CardsWrapper, PageDetails } from './MowgliBookingVerif.styled';


export const MowgliBookingVerif = () => {

  const dataCountry = ["Ukraine", "Poland", "USA"]
  const dataObjects = ["777","4546" , '3337890'];
return (
  <MowgliBookingMainPage>
    <PageDetails>
      <MowgliBookingVerifHeader />
      <CardsWrapper>
        <MowgliObjectCard country={dataCountry[0]} objects={dataObjects[0]} />
        <MowgliObjectCard country={dataCountry[1]} objects={dataObjects[1]} />
        <MowgliObjectCard country={dataCountry[2]} objects={dataObjects[2]} />
      </CardsWrapper>
      <MowgliObjectCardSecond />
      <MowgliObjectCardSecond />
      <MowgliObjectCardSecond />
    </PageDetails>
  </MowgliBookingMainPage>
);};



