import React, { useState } from 'react';
import { useAppSelector } from 'App';
import { getObjectOnVerify } from 'features/objectOnVerify/objectOnVerifySelector';
import { RegisterButton } from '../../ButtonRegisterModal/RegisterButton/RegisterButton';
import { SpanAdress, DidAdress } from './Compinents.styled';
import { ListBtn } from '../../ButtonRegisterModal/ListButton/ListButton.styled';

export const Address = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(-1);
  const { data: hotelData } = useAppSelector(getObjectOnVerify);

  const {
    hotels: {
      location: { country, stateName: state, cityName: city },
    },
  } = hotelData;

  const [data, setData] = useState<any>({
    'Location Register 1': '',
    'Location Register 2': [],
    'Location Register 3': [],
  });

  const handleClickButton = (num: number) => {
    if (num !== activeButtonIndex) {
      setActiveButtonIndex(num);
    } else {
      setActiveButtonIndex(-1);
    }
  };

  return (
    <div style={{ paddingBottom: '25px' }}>
      <div>
        <SpanAdress>Country</SpanAdress>
        <DidAdress>{country}</DidAdress>
        <SpanAdress>State</SpanAdress>
        <DidAdress>{state}</DidAdress>
        <SpanAdress>City</SpanAdress>
        <DidAdress>{city}</DidAdress>
      </div>

      <div>
        <ListBtn onClick={() => handleClickButton(1)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={1}
            key="Location Register 1"
            title="Location Register 1"
            activeButtonIndex={activeButtonIndex}
            closeList={({ elData }) => {
              setData({
                ...data,
                'Location Register 2': elData?.map(el => ({
                  title: el.cityName,
                  data: el.districts,
                })),
              });
              handleClickButton(-1);
            }}
            data={data['Location Register 1']}
          />
        </ListBtn>
        <ListBtn onClick={() => handleClickButton(2)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={2}
            key="Location Register 1"
            title="Location Register 1"
            activeButtonIndex={activeButtonIndex}
            closeList={({ elData }) => {
              setData({
                ...data,
                'Location Register 2': elData?.map(el => ({
                  title: el.stateName,
                  data: el.cities,
                })),
              });
              handleClickButton(-1);
            }}
            data={data['Location Register 1']}
          />
        </ListBtn>
        <ListBtn onClick={() => handleClickButton(3)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={3}
            key="Location Register 1"
            title="Location Register 1"
            activeButtonIndex={activeButtonIndex}
            closeList={() => {
              handleClickButton(-1);
            }}
            data={data['Location Register 1']}
          />
        </ListBtn>
      </div>
    </div>
  );
};
