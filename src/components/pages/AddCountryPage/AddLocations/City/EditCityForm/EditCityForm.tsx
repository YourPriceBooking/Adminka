import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { editCity, selectIsEnglishActiveLang, makeSelectCitiesNamesForState } from 'redux/slices';
import { EditButton } from '../../../AddCountries/EditButton/EditButton';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';

import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';
import type { EditCityItemType } from '../EditCitiesList/EditCityItem';

export const EditCityForm = ({
  city: { stateId, _id, cityName, cityPhotoURL, cityInternational, cityCode, edited, districts },
}: EditCityItemType) => {
  const [isEditingCity, setIsEditingCity] = useState(false);
  const selectCitiesNamesForState = useMemo(makeSelectCitiesNamesForState, []);
  const appDispatch = useAppDispatch();

  const [localCityName, setLocalCityName] = useState(cityName);
  const [localCityPhotoURL, setLocalCityPhotoURL] = useState(cityPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const citiesNames = useAppSelector(state => selectCitiesNamesForState(state, { stateId }));

  const setIsEditingCityTrue = useCallback(() => setIsEditingCity(true), []);

  const handleSubmitEditCity = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const cityPhotoURLTrimmed = localCityPhotoURL?.trim();
      const cityNameTrimmed = localCityName?.trim();

      if (!cityPhotoURLTrimmed || !cityNameTrimmed) {
        toast('Please provide photo url and City name');
        return;
      }

      if (citiesNames?.find(existingCityName => existingCityName === cityNameTrimmed)) {
        toast.info(`${cityNameTrimmed} exists. Try another 'name'`);
        return;
      }

      const updatedCity = {
        stateId,
        _id,
        cityName: cityNameTrimmed,
        cityPhotoURL: cityPhotoURLTrimmed,
        cityInternational: !cityInternational && isEng ? cityNameTrimmed : cityInternational,
        cityCode,
        districts,
        edited: Number(edited) + 1,
      };

      try {
        appDispatch(editCity(updatedCity));
        setIsEditingCity(false);
      } catch (error) {
        toast.error('City not updated');
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
          <span>City name</span>

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
          <span>City photo URL</span>

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
