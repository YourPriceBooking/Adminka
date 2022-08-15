import { useAppSelector } from 'App';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { isEdited } from 'common/utils';

import { EditButton } from 'components/pages/AddCountryPage/AddCountries/EditButton/EditButton';

import { selectIsEnglishActiveLang } from 'features/languages';
import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';
import type { EditCityItemType } from '../EditCitiesList/EditCityItem';
import { SubmitAddLocationButton } from '../../State/EditStateForm/EditStateForm.styled';

export const EditCityForm = ({
  city: {
    stateId,
    _id,
    cityName,
    cityPhotoURL,
    cityInternational,
    cityCode,

    langCode,
    stateInternational,

    createdAt,
    updatedAt,
  },
}: EditCityItemType) => {
  const [isEditingCity, setIsEditingCity] = useState(false);

  const [localCityName, setLocalCityName] = useState(cityName);
  const [localCityPhotoURL, setLocalCityPhotoURL] = useState(cityPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const setIsEditingCityTrue = useCallback(() => setIsEditingCity(true), []);
  const isInputDisabled = !isEditingCity;
  const isEditButtonDisabled = isEditingCity;
  const isSubmitDisabled = !localCityName?.trim() || !localCityPhotoURL?.trim();
  const $isFirstEdit = !isEdited(createdAt, updatedAt) && !isEng;

  const handleSubmitEditCity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const cityPhotoURLTrimmed = localCityPhotoURL?.trim();
    const cityNameTrimmed = localCityName?.trim();

    if (!cityPhotoURLTrimmed || !cityNameTrimmed) {
      toast('Please provide photo url and City name');
      return;
    }

    // if (citiesNames?.find(existingCityName => existingCityName === cityNameTrimmed)) {
    //   toast.info(`${cityNameTrimmed} exists. Try another 'name'`);
    //   return;
    // }

    const updatedCity = {
      stateId,
      _id,
      cityName: cityNameTrimmed,
      cityPhotoURL: cityPhotoURLTrimmed,
      cityInternational: !cityInternational && isEng ? cityNameTrimmed : cityInternational,
      cityCode,

      langCode,
      stateInternational,

      createdAt,
      updatedAt,
    };

    try {
      // appDispatch(editCity(updatedCity));
      console.log('handleSubmitEditCity ~ updatedCity', updatedCity);
      setIsEditingCity(false);
    } catch (error) {
      toast.error('City not updated');
    }
  };

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
            title={localCityPhotoURL}
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
