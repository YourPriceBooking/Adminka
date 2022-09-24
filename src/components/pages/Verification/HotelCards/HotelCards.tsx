import { Card, CardPhoto } from './HotelCards.styled';
import { Image } from "./Image";
import { Location } from "./Location";

export const HotelCards = () => (
  <Card>
    <CardPhoto>
      <Image alt="picture" />

      {/* <Gallery
          title={props.data.name}
          isShowText={false}
          url={props.data.photos[0]}
          rating={props.data.rating}
          urlImageSecond={props.data?.photos[1]}
        /> */}
    </CardPhoto>

    <div>
      <Location city="Флорида" hotel="Маямский Би" address="Проспект Ватутина, д. 15, кв. 6" />
    </div>
  </Card>
);