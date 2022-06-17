import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { editCity, selectIsEnglishActiveLang, selectCitiesNamesForActiveState } from 'redux/slices';
import type { EditCity } from 'types/apis';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';

import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';

export const EditCityForm = ({
  stateId,

  _id,
  cityName,
  cityPhotoURL,
  cityInternational,
  cityCode,
  edited,
  districts,
}: EditCity) => {
  const [isEditingCity, setIsEditingCity] = useState(false);
  const appDispatch = useAppDispatch();

  const [localCityName, setLocalCityName] = useState(cityName);
  const [localCityPhotoURL, setLocalCityPhotoURL] = useState(cityPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const citiesNames = useAppSelector(state => selectCitiesNamesForActiveState(state, stateId));

  const setIsEditingCityTrue = useCallback(() => setIsEditingCity(true), []);

  const handleSubmitEditCity = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      const content = new FormData(form);
      const cityPhotoURL = content.get('cityPhotoURL')?.toString().trim();
      const cityName = content.get('cityName')?.toString().trim();

      if (!cityPhotoURL || !cityName) {
        return toast('Please provide photo url and City name');
      }

      if (citiesNames?.find(existingCityName => existingCityName === cityName)) {
        return toast.info(`${cityName} exists. Try another 'name'`);
      }

      const updatedCity = {
        stateId,
        _id,
        cityName: localCityName,
        cityPhotoURL: localCityPhotoURL,
        cityInternational: !cityInternational && isEng ? localCityName : cityInternational,
        cityCode,
        districts,
        edited: Number(edited) + 1,
      };

      try {
        appDispatch(editCity(updatedCity));
        setIsEditingCity(false);
        // toast.success('City updated');
      } catch (error) {
        toast.error('City not updated');
        console.log(error);
      }
    },

    [
      citiesNames,
      stateId,
      _id,
      localCityName,
      localCityPhotoURL,
      cityInternational,
      isEng,
      cityCode,
      districts,
      edited,
      appDispatch,
    ]
  );

  const isInputDisabled = !isEditingCity;
  const isEditButtonDisabled = isEditingCity;
  const isSubmitDisabled = !localCityName?.trim() || !localCityPhotoURL?.trim();
  const $isFirstEdit = !edited && !isEng;

  return (
    <EditCityFormStyled onSubmit={handleSubmitEditCity}>
      <CityInfo>
        <label>
          <input
            type="text"
            name="cityName"
            value={localCityName}
            onChange={e => setLocalCityName(e.currentTarget.value)}
            disabled={isInputDisabled}
            maxLength={30}
            minLength={2}
            required
          />
        </label>

        <label>
          <EditCityPhotoURLInput
            type="url"
            name="cityPhotoURL"
            value={localCityPhotoURL}
            onChange={e => setLocalCityPhotoURL(e.currentTarget.value)}
            disabled={isInputDisabled}
            maxLength={300}
            minLength={8}
            required
          />
        </label>
      </CityInfo>

      {!isEditingCity && (
        <EditButton
          $isFirstEdit={$isFirstEdit}
          onClick={setIsEditingCityTrue}
          disabled={isEditButtonDisabled}
        />
      )}

      {isEditingCity && (
        <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
          Done
        </SubmitAddLocationButton>
      )}
    </EditCityFormStyled>
  );
};
