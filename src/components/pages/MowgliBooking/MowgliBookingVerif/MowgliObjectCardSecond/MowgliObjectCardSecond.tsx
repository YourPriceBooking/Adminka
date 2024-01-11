

import {Button, CardsStyle } from "./MowgliObjectCardSecond.styled";

export const MowgliObjectCardSecond = () => (

<CardsStyle>
  <div className="cardBlockHeader">
    <p className="left">
        <div >X</div>
      <p>
        <b>USA</b> <span className="text">pending verification</span>
      </p>
    </p>
    <p>
      Objects on verif <span>0</span>
    </p>
  </div>
  <div className="buttonBlock">
    <Button>
      Take one object for verification
    </Button>
  </div>
        {/* <HotelCards
          city={item.address.city}
          hotel={item.objectName}
          address={`${item.address.street}, ${item.address.house}, ${item.address.apartment}`}
          imgSrc={item.photos[0].url}
          type={item.type.type}
        /> */}
     
</CardsStyle>
);

