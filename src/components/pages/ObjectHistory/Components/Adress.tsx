import React, { useState } from 'react';
import { RegisterButton } from '../../ButtonRegisterModal/RegisterButton/RegisterButton';
import { SpanAdress, DidAdress } from './Compinents.styled';
import { ListBtn } from '../../ButtonRegisterModal/ListButton/ListButton.styled';

export const Address = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(-1);

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
        <DidAdress>Ukraine</DidAdress>
        <SpanAdress>State</SpanAdress>
        <DidAdress>Kyiv</DidAdress>
        <SpanAdress>City</SpanAdress>
        <DidAdress>Kyiv</DidAdress>
      </div>

      <div>
        <ListBtn onClick={() => handleClickButton(1)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={1}
            key="Location Register 1"
            title="Location Register 1"
            activeButtonIndex={activeButtonIndex}
            closeList={() => handleClickButton(-1)}
          />
        </ListBtn>
        <ListBtn onClick={() => handleClickButton(2)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={2}
            key="Location Register 2"
            title="Location Register 2"
            activeButtonIndex={activeButtonIndex}
            closeList={() => handleClickButton(-1)}
          />
        </ListBtn>
        <ListBtn onClick={() => handleClickButton(3)} style={{ marginBottom: '25px' }}>
          <RegisterButton
            index={3}
            key="Location Register 3"
            title="Location Register 3"
            activeButtonIndex={activeButtonIndex}
            closeList={() => handleClickButton(-1)}
          />
        </ListBtn>
      </div>
    </div>
  );
};
