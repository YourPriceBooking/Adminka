import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { baseUrl, endpoints } from 'features/api';
import { toast } from 'react-toastify';
import {
  ButtonSubmit,
  DivAdressChat,
  DivButtons,
  DivContent,
  /* DivObjectHistoryMain, */
  /* HObject, */
  ImgDoneData,
  InputCheckData,
  InputData,
  LabelDataTest,
} from './ObjectHistory.styled';
import { Items } from './Components/Items';
import PhoneNumbers from './Components/PhoneNumbers';
import { DivText } from './Components/Compinents.styled';
import done from '../../../assets/icons/done.svg';
import { useObjectHistoryState } from './state/ObjectHistoryState';
import { AddAdressUrl } from './Components/addAdressUrl';
import { Address } from './Components/Adress';
import { Chat } from '../Chat';
import { Material } from './Components/Material';
import { VerifInfo } from './Components/VerifInfo';
import type { ObjectInfoInfo } from './ObjectHistory.type';

export const ObjectHistoryInfo: React.FC<ObjectInfoInfo> = ({
  verifInfoStart,
  verifInfoFinish,
  isFirst = false,
  handleTranslate,
}) => {
  const { hotelId } = useParams();

  const {
    checkedItems,
    setCheckedItems,
    isSubmitted,
    setIsSubmitted,
    hasDate,
    setHasDate,
    phoneNumbers,
    setPhoneNumbers,
    noFurtherChecks,
    setNoFurtherChecks,
    showDateError,
    setShowDateError,
    items,
    isButtonClicked,
    setIsButtonClicked,
  } = useObjectHistoryState();
  const navigate = useNavigate();

  const handleCheckboxChange = (index: number) => {
    if (!isSubmitted) {
      setCheckedItems(prevCheckedItems => {
        const newCheckedItems = [...prevCheckedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        return newCheckedItems;
      });

      if (hasDate && !checkedItems[index]) {
        setHasDate('');
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSubmitted) {
      const inputValue = event.target.value;
      const formattedValue = inputValue
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 10);
      setHasDate(formattedValue);
    }
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    if (!isSubmitted) {
      setPhoneNumbers(prevPhoneNumbers => {
        const newPhoneNumbers = [...prevPhoneNumbers];
        newPhoneNumbers[index] = value;
        return newPhoneNumbers;
      });
    }
  };

  const handleSendItems = async () => {
    if (!hasDate && !noFurtherChecks) {
      setShowDateError(true);
      return;
    }

    const selectedItems = items.filter((_, index) => checkedItems[index]);
    // eslint-disable-next-line no-console
    console.log(selectedItems);
    setIsSubmitted(true);

    setIsButtonClicked(true);

    try {
      await axios.patch(`${baseUrl}${endpoints.finishVerification}`, {
        id: hotelId,
        phone1: phoneNumbers[0],
        phone2: phoneNumbers[1],
        nextVerificationDate: hasDate,
      });
      toast.success('SUCCESS');
      navigate('/verification/house-page', { replace: true });
    } catch (error) {
      toast.error(`Error: OBJECT DON'T VERIFY`);
    }
  };

  const handleNotVerif = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}${endpoints.deleteVerification}?hotelsId=${hotelId}`
      );

      if (response.data.code !== 200) {
        const responseAdded = await axios.delete(
          `${baseUrl}${endpoints.deleteAddedObject}?id=${hotelId}`
        );

        if (responseAdded.data.code === 200) {
          toast.success('OK');
          setIsSubmitted(true);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast.error(response.data.message);
        }
      } else {
        setIsSubmitted(true);
        toast.success('OK');
      }
      console.log(response);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <VerifInfo values={verifInfoStart} verifFinish={false} />

      <DivContent>
        <Material />
        <div>
          <DivAdressChat>
            <Address />
            <Chat />
          </DivAdressChat>
          {isFirst && (
            <AddAdressUrl
              isSubmitted={isSubmitted}
              handleTranslate={handleTranslate}
              hotelId={hotelId}
            />
          )}
          <DivText>Next verification date</DivText>
          <InputData
            type="text"
            id="date-input"
            value={hasDate}
            onChange={handleDateChange}
            disabled={isSubmitted || noFurtherChecks}
            placeholder="DD/MM/YYYY"
            required
          />
        </div>
        <div>
          <InputCheckData
            type="checkbox"
            id="no-checks-checkbox"
            checked={noFurtherChecks}
            onChange={() => setNoFurtherChecks(!noFurtherChecks)}
            disabled={isSubmitted}
          />

          <LabelDataTest htmlFor="no-checks-checkbox">
            No further checks are necessary in the future:
          </LabelDataTest>
          {noFurtherChecks && <ImgDoneData src={done} alt="done-checkbox" />}
        </div>

        <PhoneNumbers
          phoneNumbers={phoneNumbers}
          handlePhoneNumberChange={handlePhoneNumberChange}
          isSubmitted={isSubmitted}
        />
        <Items
          items={items}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          isSubmitted={isSubmitted}
        />
        {showDateError && !hasDate && !noFurtherChecks && (
          <p style={{ color: 'red' }}>Please enter a date.</p>
        )}
      </DivContent>
      <DivButtons>
        <ButtonSubmit
          type="button"
          onClick={handleSendItems}
          disabled={isSubmitted}
          isSubmitted={isSubmitted}
        >
          Verify
        </ButtonSubmit>
        {isFirst && (
          <ButtonSubmit type="button" onClick={handleNotVerif} isSubmitted={isSubmitted}>
            Not Verify
          </ButtonSubmit>
        )}
      </DivButtons>
      {isButtonClicked && <VerifInfo values={verifInfoFinish} verifStart={false} />}
    </div>
  );
};
