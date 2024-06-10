import React, { useEffect } from 'react';

import adress from 'assets/icons/adress.svg';
import apartHotelIcon from 'assets/icons/apartHotelIcon.svg';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'App';
import type { RootState } from 'App/store';
import { useParams } from 'react-router-dom';
import { getObjectOnVerify } from 'features/objectOnVerify/objectOnVerifySelector';
import { fetchVerifierData } from 'features/objectOnVerify/objectOnVerifyOperation';
import { RatingComponent } from './components/Rating';
import { PriceComponent } from './components/PriceComponent';
import { ButtonClose } from './components/ButtonClose';
import { ImgHotel, Name, ImgAsress, PAdress, DivPage, DivMain } from './HousePage.styled';
import { Description } from './components/Description';
import { GalleryComponent } from './components/GalleryComponent';
// import { VideoComponent } from './components/VideoComponent';
// import photo1 from './img/1.png';
// import photo2 from './img/2.png';
import OptionDescriptionComponent from './components/OptionDescriptionComponent';
import { Reviews } from './components/Reviews';
import PaymentComponent from './components/PaymentComponent';
import ListOptionComponent from './components/ListOptionComponents';
import ObjectHistory from '../../ObjectHistory/ObjectHistory';

// const photos: string[] = [
//   photo1,
//   photo2,
//   photo1,
//   photo2,
//   photo1,
//   photo2,
//   photo1,
//   photo2,
//   photo1,
//   photo2,
//   photo1,
//   photo2,
// ];
// const desc: string[] = [
//   'удобства для гостей с ограниченными возможностями',
//   'первая линия от моря',
//   'вторая линия от моря',
//   'номера для некурящих',
//   'доставка еды и напитков',
//   'ужин включён',
//   'подземный паркинг',
//   'частная пакровка',
//   'завтрак включен',
//   'обед включен',
//   'ресторан',
//   'обед включен',
//   'ночной бар',
//   'спорт зал',
// ];
export const HousePage: React.FC = () => {
  const { hotelId = '' } = useParams();
  const { data: hotelData } = useAppSelector(getObjectOnVerify);

  const dispatch = useAppDispatch();
  // const [description, setDescription] = useState<Record<string, string>>({
  //   original:
  //     'Здесь мы пишем про объект - описание объекта. Commons-logo.svg Медиафайлы на Викискладе Па́бло Эми́лио Эскобар Гави́рия (исп. Pablo Emilio Escobar Gaviria; 1 декабря 1949 — 2 декабря 1993) — колумбийский наркобарон и террорист. Эскобара называют «Королем кокаина», поскольку он был лидером Медельинского картеля, контролировавшего к концу 1980 года 80 % от мирового рынка кокаина[4].',
  // });

  const token = useAppSelector((state: RootState) => state.enterToken.token);

  useEffect(() => {
    dispatch(fetchVerifierData(hotelId));
  }, [dispatch, hotelId]);

  const photos = hotelData.hotels.photos.map(({ url }) => url);
  const desc = hotelData.hotels.services.map(({ type }) => type);
  const {
    hotels: { address, time, description, payments },
  } = hotelData;

  const handleTranslate = async () => {
    try {
      const response = await axios.patch(
        `https://ypbooking.chost.com.ua/api/hotels-verification/add-a-translation`,
        {
          id: '6521b17efa494fab9ac88707',
          // description: Object.values(description),
          languages: ['en', 'uk', 'pl', 'ru'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      console.log(data);

      // setDescription({ ...description, ...data.translate }); Заменить на санк в редакс
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{}}>
      <DivMain>
        <DivPage>
          <ButtonClose />

          <ImgHotel src={apartHotelIcon} alt="hotel icon" />
          <Name>{hotelData.hotels.objectName}</Name>
          <RatingComponent rating={4.4} />
          <ImgAsress src={adress} alt="" />
          <PAdress>{`${address.street}, ${address.house}, ${address.city}, ${address.state}, ${hotelData.hotels.address.country}`}</PAdress>
          <PriceComponent
            minPrice={500}
            maxPrice={1000}
            checkIn={time.checkin}
            checkOut={time.checkout}
          />
          <GalleryComponent photos={photos} hasCard={false} />

          <Description hasCard={false} text={{ original: description }} />

          {/* <VideoComponent videoId="eoGdSempEuQ" />  */}
          <OptionDescriptionComponent styleCard={false} description={desc} />
          <PaymentComponent payments={payments} />
          <Reviews />

          <ListOptionComponent />
          <ObjectHistory handleTranslate={handleTranslate} />
        </DivPage>
      </DivMain>
    </div>
  );
};
