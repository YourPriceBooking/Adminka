import type { EntityId } from '@reduxjs/toolkit';
import type { EditCity } from 'types/apis';
import { useAppSelector } from 'App';
import { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { EditButton } from 'components/pages/CountryPage/Countries/EditButton';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectCityById, useEditCityMutation } from 'features/cities';
import { EditCityFormStyled, CityInfo, EditCityPhotoURLInput } from './EditCityForm.styled';
import { SubmitAddLocationButton } from '../../States/EditStateForm/EditStateForm.styled';

type EditCityFormProps = {
  cityId: EntityId;
};

export const EditCityForm = ({ cityId }: EditCityFormProps) => {
  const [editCity, { isLoading }] = useEditCityMutation();
  const city = useAppSelector(state => selectCityById(state, cityId));
  const activeLanguageCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingCity, setIsEditingCity] = useState(false);
  const setIsEditingCityTrue = useCallback(() => setIsEditingCity(true), []);

  if (!city || !activeLanguageCode) return null;

  const {
    stateId,
    stateInternational,
    _id: id,
    langCode,
    cityName,
    cityInternational,
    cityPhotoURL,
    cityCode,
  } = city;

  const isInputDisabled = !isEditingCity;
  const isEditButtonDisabled = isEditingCity;

  const isSubmitDisabled = isLoading;
  const $isFirstEdit = langCode === 'EN' && !isEng;

  const handleSubmitEditCity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const cityPhotoURLTrimmed = formData.get('cityPhotoURL')?.toString().trim();
    const cityNameTrimmed = formData.get('cityName')?.toString().trim();

    if (!cityPhotoURLTrimmed || !cityNameTrimmed) {
      toast.info('Please provide photo url and City name');
      return;
    }

    const updatedCity: EditCity = {
      stateId,
      stateInternational,

      _id: id,
      cityName: cityNameTrimmed,
      cityInternational,
      cityPhotoURL: cityPhotoURLTrimmed,
      cityCode,

      langCode: activeLanguageCode,
    };

    try {
      const editedCityName = (await editCity(updatedCity).unwrap())?.entities?.[id]?.cityName;

      if (editedCityName) {
        toast.success(`City ${editedCityName} updated`);
      }

      setIsEditingCity(false);
    } catch (error) {
      toast.error('City not updated');
    }
  };

  const showEditCityFormInterface = (
    <CityInfo>
      <label>
        <span>City name</span>

        <input
          type="text"
          name="cityName"
          defaultValue={cityName}
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
          defaultValue={cityPhotoURL}
          disabled={isInputDisabled}
          maxLength={300}
          minLength={8}
          required
          title={cityPhotoURL}
        />
      </label>
    </CityInfo>
  );

  const showEditButton = !isEditingCity && (
    <EditButton
      $isFirstEdit={$isFirstEdit}
      onClick={setIsEditingCityTrue}
      disabled={isEditButtonDisabled}
    />
  );

  const showSubmitButton = isEditingCity && (
    <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
      Done
    </SubmitAddLocationButton>
  );

  return (
    <EditCityFormStyled onSubmit={handleSubmitEditCity}>
      {showEditCityFormInterface}

      {showEditButton}

      {showSubmitButton}
    </EditCityFormStyled>
  );
};
