import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import {
  getVerification,
  getVerificationObject,
} from 'features/verification/verificationSelectors';
import {
  fetchVerification,
  fetchVerificationObject,
} from 'features/verification/verificationOperation';
// import { Link } from 'react-router-dom';
import { clearVerificationObject } from 'features/verification/verificationSlice';
import { Link } from 'react-router-dom';
import { ObjectCard } from './ObjectCard';

import { CardsStyle, CardsWrapper, Div } from './ObjectCard/ObjectCard.styled';
import { HotelCards } from '../HotelCards';
// import { HotelCards } from '../HotelCards';

export const PendingObjects = () => {
  const dispatch = useAppDispatch();

  const verificationCountryList = useAppSelector(getVerification);
  const verificationObject = useAppSelector(getVerificationObject);

  const onClick = (country: string) => {
    if (verificationObject.length <= 18) {
      dispatch(fetchVerificationObject(country));
    }
  };

  useEffect(() => {
    dispatch(fetchVerification());

    return () => {
      dispatch(clearVerificationObject());
    };
  }, []);

  return (
    <>
      <CardsWrapper>
        {verificationCountryList !== null &&
          Object.keys(verificationCountryList).map(country => {
            const verification = verificationCountryList[country];
            return (
              <ObjectCard
                key={country}
                country={country}
                onClick={onClick}
                count={verification}
                disabled={verificationObject.length >= 18}
              />
            );
          })}
      </CardsWrapper>
      <Div>
        {verificationObject.map(({ result }) => (
          <Link
            key={Math.random()}
            to={`/verification/house-page/${result._id}`}
            state={{ hotelId: result._id }}
          >
            <CardsStyle>
              <HotelCards
                city={result.address.city}
                hotel={result.objectName}
                address={`${result.address.street}, ${result.address.house}, ${result.address.apartment}`}
                imgSrc={result.photos[0].url}
                type={result.type.type}
              />
            </CardsStyle>
          </Link>
        ))}
      </Div>
    </>
  );
};
