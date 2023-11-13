import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import {
  getVerification,
  getVerificationObject,
} from 'features/verification/verificationSelectors';
import { fetchVerificationObject } from 'features/verification/verificationOperation';
import { Link } from 'react-router-dom';
import { clearVerificationObject } from 'features/verification/verificationSlice';
import { ObjectCard } from './ObjectCard';

import { CardsStyle, CardsWrapper, Div } from './ObjectCard/ObjectCard.styled';
import { HotelCards } from '../HotelCards';

export const PendingObjects = () => {
  const dispatch = useAppDispatch();

  const verificationCountryList = useAppSelector(getVerification);
  const verificationObject = useAppSelector(getVerificationObject);

  const onClick = (country: string) => {
    dispatch(fetchVerificationObject(country));
  };

  useEffect(
    () => () => {
      dispatch(clearVerificationObject());
    },
    []
  );

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
                // objects={defaultObjects}
                onClick={onClick}
                // components={components}
                count={verification}
              />
            );
          })}
      </CardsWrapper>
      <Div>
        {verificationObject && (
          <Link to="/verification/house-page">
            <CardsStyle>
              <HotelCards
                city={verificationObject.address.city}
                hotel={verificationObject.objectName}
                address={`${verificationObject.address.street}, ${verificationObject.address.house}, ${verificationObject.address.apartment}`}
                imgSrc={verificationObject.photos[0].url}
              />
            </CardsStyle>
          </Link>
        )}
      </Div>
    </>
  );
};
