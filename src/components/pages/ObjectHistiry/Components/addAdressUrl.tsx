import React, { useState } from 'react';
import adress from 'assets/icons/adress.svg';
import { ButtonCustom, InputCostomed } from './Compinents.styled';

export const AddAdressUrl: React.FC = () => {
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedText1, setSavedText1] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedText2, setSavedText2] = useState('');

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText1(event.target.value);
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText2(event.target.value);
  };

  const handleSaveButtonClick1 = () => {
    setSavedText1(inputText1);
  };

  const handleSaveButtonClick2 = () => {
    setSavedText2(inputText2);
  };

  return (
    <div style={{ marginBottom: '30px', position: 'relative' }}>
      <img
        src={adress}
        alt="adress"
        style={{ width: '27px', height: '39px', marginBottom: '-50px' }}
      />
      <div>
        <InputCostomed type="text" value={inputText1} onChange={handleInputChange1} />

        <div />
        <div>
          <ButtonCustom
            type="submit"
            onClick={handleSaveButtonClick1}
            style={{ position: 'absolute', top: '20px', left: '550px' }}
          >
            Add point
          </ButtonCustom>
        </div>
        <InputCostomed type="text" value={inputText2} onChange={handleInputChange2} />
        <ButtonCustom
          type="submit"
          onClick={handleSaveButtonClick2}
          style={{ position: 'absolute', top: '110px', left: '550px' }}
        >
          Add video to YouTube and object page
        </ButtonCustom>
        <div />
      </div>
    </div>
  );
};
