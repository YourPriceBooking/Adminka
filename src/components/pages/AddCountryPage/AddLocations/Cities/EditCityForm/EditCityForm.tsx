import { useAppSelector } from 'App';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { isEdited, logRender } from 'common/utils';

import { EditButton } from 'components/pages/AddCountryPage/AddCountries/EditButton/EditButton';

import type { EditCity } from 'types/apis';
import { selectIsEnglishActiveLang } from 'features/languages';
import type { CityItemProps } from '../CitiesList/CityItem';
import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';

const cityItem: EditCity = {
  stateId: '12345stateId',

  _id: 'test',
  cityName: 'test',
  cityPhotoURL: 'test',
  cityInternational: 'test',
  cityCode: 'test',

  langCode: 'test',

  createdAt: 'test',
  updatedAt: 'test',
};

const useSelectCity = (cityId: string) => {
  logRender('useSelectCity ~ cityId', cityId);

  return cityItem;
};

export const EditCityForm = ({ cityId }: CityItemProps) => {
  const {
    stateId,
    _id: id,
    cityName,
    cityPhotoURL,
    cityInternational,
    cityCode,

    langCode,

    createdAt,
    updatedAt,
  } = useSelectCity(cityId);

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
      _id: id,
      cityName: cityNameTrimmed,
      cityPhotoURL: cityPhotoURLTrimmed,
      cityInternational: !cityInternational && isEng ? cityNameTrimmed : cityInternational,
      cityCode,

      langCode,

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
