import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from 'App';
import { getVerification } from 'features/verification/verificationSelectors';
import { ObjectCard } from './ObjectCard';
import { HotelCards } from '../HotelCards';

import { CardsWrapper, Div, CardsStyle } from './ObjectCard/ObjectCard.styled';

export const PendingObjects = () => {
  const [components, setComponents] = useState<string[]>([]);

  const verificationList = useAppSelector(getVerification);

  const onClick = () => {
    if (components.length < 3) {
      setComponents(prevState => [...prevState, '']);
    }
  };

  return (
    <>
      <CardsWrapper>
        {verificationList !== null &&
          Object.keys(verificationList).map(country => {
            const verification = verificationList[country];
            return (
              <ObjectCard
                key={country}
                country={country}
                // objects={defaultObjects}
                onClick={onClick}
                components={components}
                count={verification}
              />
            );
          })}
        {/* 
          
          <ObjectCard
            country="Poland"
            objects={defaultObjects}
            onClick={onClick}
            components={components}
          />
          <ObjectCard
            country="USA"
            objects={defaultObjects}
            onClick={onClick}
            components={components}
          /> */}
      </CardsWrapper>
      <Div>
        {components.map((_, idx) => (
          <Link to="/verification/house-page">
            <CardsStyle>
              <HotelCards
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                city="Флорида"
                hotel="Маямский Би"
                address="Проспект Ватутина, д. 15, кв. 6"
                style={{ position: 'absolute', top: `${idx * 150}px` }}
              />
            </CardsStyle>
          </Link>
        ))}
      </Div>
    </>
  );
};
