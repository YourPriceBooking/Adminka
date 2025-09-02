/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import {
  getAddedToVerification,
  getOnVerification,
  getVerificationObject,
} from 'features/verification/verificationSelectors';
import {
  fetchVerification,
  fetchVerificationObject,
  fetchObjectInWorking,
  fetchInWorkingVerifier,
} from 'features/verification/verificationOperation';
import {
  clearVerificationObject,
  deleteVerificationCountry,
} from 'features/verification/verificationSlice';
import { Link } from 'react-router-dom';
import { ObjectCard } from './ObjectCard';

import {
  ArrowLeft,
  ArrowRight,
  Button,
  CardsStyle,
  CardsWrapper,
  Div,
  ScrollWrapper,
} from './ObjectCard/ObjectCard.styled';
import { HotelCards } from '../HotelCards';

export const PendingObjects = () => {
  const dispatch = useAppDispatch();

  const onVerification = useAppSelector(getOnVerification);
  const addedToVerification = useAppSelector(getAddedToVerification);
  const verificationObject = useAppSelector(getVerificationObject);

  const onClick = (country: string) => {
    dispatch(fetchVerificationObject(country));
  };

  const onClickObjectInWorking = (item: any) => {
    const takeObject = { hotels: item._id, objectName: item.objectName };
    dispatch(fetchObjectInWorking(takeObject));
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.firstChild instanceof HTMLElement
          ? scrollRef.current.firstChild.offsetWidth + 20
          : 320;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.firstChild instanceof HTMLElement
          ? scrollRef.current.firstChild.offsetWidth + 20
          : 320;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    dispatch(fetchVerification());
    dispatch(fetchInWorkingVerifier());
    const body = document.getElementsByTagName('body');

    if (body[0]) {
      body[0].className = 'orange';
    }
    return () => {
      dispatch(clearVerificationObject());
      if (body[0]) {
        body[0].className = '';
      }
    };
  }, []);
  return (
    <>
      <CardsWrapper>
        {onVerification !== null &&
          addedToVerification !== null &&
          Object.keys(onVerification).map(country => {
            const verification = onVerification[country];
            const added = addedToVerification[country];
            return (
              <ObjectCard
                key={country}
                country={country}
                onClick={onClick}
                count={verification}
                countAdded={added}
                // disabled={verificationObject.length >= 18}
              />
            );
          })}
      </CardsWrapper>

      <Div>
        <ArrowLeft type="button" onClick={scrollLeft}>
          ◀
        </ArrowLeft>
        <ScrollWrapper ref={scrollRef}>
          {verificationObject &&
            Object.keys(verificationObject).map(country => {
              const list = verificationObject[country];
              return (
                <CardsStyle key={country}>
                  <div className="cardBlockHeader">
                    <p className="left">
                      {list.length === 0 && (
                        <div onClick={() => dispatch(deleteVerificationCountry({ country }))}>
                          X
                        </div>
                      )}
                      <p>
                        <b>{country}</b> <span className="text">pending verification</span>
                      </p>
                    </p>
                    <p>
                      Objects on verif <span>{list.length}</span>
                    </p>
                  </div>
                  <div className="buttonBlock">
                    <Button disabled={list.length === 5} onClick={() => onClick(country)}>
                      Take one object for verification
                    </Button>
                  </div>
                  <div className="list">
                    {list.map(item => (
                      <Link
                        key={item._id}
                        to={`/verification/house-page/${item._id}`}
                        state={{ hotelId: item._id }}
                        onClick={() => onClickObjectInWorking(item)}
                      >
                        <HotelCards
                          city={item.address.city}
                          hotel={item.objectName}
                          address={`${item.address.street}, ${item.address.house}, ${item.address.apartment}`}
                          imgSrc={item.photos[0].url}
                          type={item.type.type}
                        />
                      </Link>
                    ))}
                  </div>
                </CardsStyle>
              );
            })}
        </ScrollWrapper>
        <ArrowRight type="button" onClick={scrollRight}>
          ▶
        </ArrowRight>
      </Div>
    </>
  );
};
