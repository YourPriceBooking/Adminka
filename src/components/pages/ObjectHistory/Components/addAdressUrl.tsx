import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { baseUrl, endpoints } from 'features/api';
import adress from 'assets/icons/adress.svg';
import pen from 'assets/icons/pen.svg';
import {
  ButAddAdrPen,
  ButtonCustom,
  ButtonTranslationAdr,
  InputCostomed,
} from './Compinents.styled';
import type { AddAdressUrlProps } from '../ObjectHistory.type';
import { AddTranslationButton } from './AddTranslationButton';

export const AddAdressUrl: React.FC<AddAdressUrlProps> = ({ isSubmitted, handleTranslate }) => {
  const { hotelId } = useParams();

  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');

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
    setInputText1('');
  };

  const handleSaveButtonClick2 = () => {
    setSavedText2(inputText2);
    setInputText2('');
  };

  useEffect(() => {
    async function sendPoint() {
      try {
        if (savedText1.includes('http')) {
          const {
            data: { result },
          } = await axios.get(`${baseUrl}${endpoints.getIdVerificationObject}?hotelsId=${hotelId}`);

          if (result && result.length > 0) {
            await axios.patch(`${baseUrl}${endpoints.addPointToMap}`, {
              id: result[0]._id,
              pointOnTheMap: savedText1,
            });
            toast.success('SUCCESS');
          } else {
            toast.error('Error: Hotel Id NOT Found');
          }
        } else {
          toast.error('Error: IS NOT URL ON POINT');
        }
      } catch (err: any) {
        toast.error(`Error: ${err.response.data.message}`);
      }
    }

    if (savedText1.length > 0) {
      sendPoint();
    }
  }, [savedText1]);

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
          <ButtonCustom type="submit" onClick={handleSaveButtonClick1} style={{ top: '20px' }}>
            Add point
          </ButtonCustom>
          {!isSubmitted && (
            <ButAddAdrPen type="button" style={{ top: '120px' }}>
              <img src={pen} alt="pen" />
            </ButAddAdrPen>
          )}
        </div>
        <InputCostomed type="text" value={inputText2} onChange={handleInputChange2} />
        <ButtonCustom type="submit" onClick={handleSaveButtonClick2}>
          Add video to YouTube and object page
        </ButtonCustom>
        {!isSubmitted && (
          <ButAddAdrPen type="button">
            <img src={pen} alt="pen" />
          </ButAddAdrPen>
        )}
        <div />
      </div>
      <ButtonTranslationAdr>
        <AddTranslationButton handleTranslate={handleTranslate} />
      </ButtonTranslationAdr>
    </div>
  );
};
