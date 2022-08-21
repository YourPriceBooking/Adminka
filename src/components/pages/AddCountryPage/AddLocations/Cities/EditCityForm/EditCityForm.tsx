import { useAppSelector } from 'App';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { EditButton } from 'components/pages/AddCountryPage/AddCountries/EditButton/EditButton';
import type { EditCity } from 'types/apis';
import { selectIsEnglishActiveLang } from 'features/languages';
import { selectCityById } from 'features/cities';
import type { CityItemProps } from '../CitiesList/CityItem';
import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';

export const EditCityForm = ({ cityId }: CityItemProps) => {
  const city = useAppSelector(state => selectCityById(state, cityId));

  const [isEditingCity, setIsEditingCity] = useState(false);

  const [localCityName, setLocalCityName] = useState(() => city?.cityName);
  const [localCityPhotoURL, setLocalCityPhotoURL] = useState(() => city?.cityPhotoURL);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const setIsEditingCityTrue = useCallback(() => setIsEditingCity(true), []);

  if (!city) return null;

  const { _id: id, langCode } = city;

  const isInputDisabled = !isEditingCity;
  const isEditButtonDisabled = isEditingCity;
  const isLoading = false;
  const isSubmitDisabled = isLoading || !localCityName?.trim() || !localCityPhotoURL?.trim();
  const $isFirstEdit = langCode === 'EN' && !isEng;

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

    const updatedCity: EditCity = {
      _id: id,
      cityName: cityNameTrimmed,
      cityPhotoURL: cityPhotoURLTrimmed,
      langCode,
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
