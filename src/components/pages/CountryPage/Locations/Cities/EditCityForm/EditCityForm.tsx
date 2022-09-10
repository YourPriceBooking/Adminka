import type { FormEvent } from 'react';
import { useRef, useCallback, useState } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import type { EditCity } from 'types/apis';
import { useAppSelector } from 'App';
import { toast } from 'react-toastify';
import {
  AddDirButton,
  ButtonsOverlay,
  EditButton,
  SubmitAddLocationButton,
} from 'components/shared/Buttons';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
import { selectCityById, useEditCityMutation } from 'features/cities';
import { useCloseOnOutsideClick } from 'common/hooks';
import {
  EditCityFormStyled,
  CityInfo,
  EditCityPhotoURLInput,
  EditCityPhotoLabel,
  CityNameLabel,
  CityNameInput,
} from './EditCityForm.styled';

type EditCityFormProps = {
  cityId: EntityId;
};

export const EditCityForm = ({ cityId }: EditCityFormProps) => {
  const [editCity, { isLoading }] = useEditCityMutation();
  const city = useAppSelector(state => selectCityById(state, cityId));
  const activeLanguageCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [isEditingCity, setIsEditingCity] = useState(false);
  const startEditing = useCallback(() => setIsEditingCity(true), []);
  const stopEditing = useCallback(() => setIsEditingCity(false), []);

  const formRef = useRef<HTMLFormElement>(null);

  const addDir = useCallback(() => {
    toast.success('TODO: Add Directory Fn');
  }, []);

  const addLoc = useCallback(() => {
    toast.success('TODO: Add Location Fn');
  }, []);

  useCloseOnOutsideClick({
    isEditing: isEditingCity,
    stopEditing,
    formRef,
  });

  if (!city || !activeLanguageCode) return null;

  const {
    stateId,
    stateInternational,
    _id: id,
    langCode,
    cityName,
    cityInternational,
    cityCode,
    cityPhotoURL,
    cityPhotoAlt,
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
      cityCode,
      cityPhotoURL: cityPhotoURLTrimmed,
      cityPhotoAlt,

      langCode: activeLanguageCode,
    };

    try {
      const editedCityName = (await editCity(updatedCity).unwrap())?.entities[id]?.cityName;

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
      <CityNameLabel>
        <span>City &nbsp;</span>

        <CityNameInput
          type="text"
          name="cityName"
          defaultValue={cityName}
          disabled={isInputDisabled}
          maxLength={30}
          minLength={2}
          required
        />
      </CityNameLabel>

      <EditCityPhotoLabel>
        <span>Photo</span>

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
      </EditCityPhotoLabel>
    </CityInfo>
  );

  const addDirHotelierDisabled = false;
  const addDirUsersDisabled = true;

  const showEditButtons = !isEditingCity && (
    <>
      <EditButton
        $isFirstEdit={$isFirstEdit}
        onClick={startEditing}
        disabled={isEditButtonDisabled}
      />

      <AddDirButton onClick={addDir} disabled={addDirHotelierDisabled} $isEnabled>
        Add Dir <br />
        Hotelier
      </AddDirButton>

      <AddDirButton onClick={addLoc} disabled={addDirUsersDisabled}>
        Add Dir <br />
        for Users
      </AddDirButton>
    </>
  );

  const showSubmitButton = isEditingCity && (
    <SubmitAddLocationButton type="submit" disabled={isSubmitDisabled}>
      Done
    </SubmitAddLocationButton>
  );

  const showButtonsOverlay = (
    <ButtonsOverlay $isEditing={isEditingCity}>
      {showEditButtons}

      {showSubmitButton}
    </ButtonsOverlay>
  );

  return (
    <EditCityFormStyled onSubmit={handleSubmitEditCity} ref={formRef}>
      {showEditCityFormInterface}

      {showButtonsOverlay}
    </EditCityFormStyled>
  );
};
