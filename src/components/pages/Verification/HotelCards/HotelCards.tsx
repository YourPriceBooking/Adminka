import { Card, CardPhoto } from './HotelCards.styled';
import { Image } from './Image';
import { Location } from './Location';

type ICard = {
  city: string;
  hotel: string;
  address: string;
  style?: React.CSSProperties;
  imgSrc: string;
};
export const HotelCards = ({
  city,
  hotel,
  address,
  style,
  imgSrc,
}: ICard & { style?: React.CSSProperties }) => (
  <Card style={style}>
    <CardPhoto>
      <Image src={imgSrc} />
    </CardPhoto>

    <div>
      <Location city={city} hotel={hotel} address={address.replace(', undefined', '')} />
    </div>
  </Card>
);
